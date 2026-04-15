import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-demand revalidation API route.
 * Responds to GET requests from the Laravel admin panel.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get('secret');
  const tag    = searchParams.get('tag');
  const path   = searchParams.get('path');

  // 1. Validate the secret token
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { revalidated: false, message: 'Invalid secret token.' },
      { status: 401 }
    );
  }

  // 2. Revalidate by tag (preferred)
  if (tag) {
    try {
      if (tag === 'all') {
        const allTags = ['settings', 'pages', 'umrah-packages', 'hajj-packages', 'reviews', 'hotels', 'blogs'];
        allTags.forEach(t => revalidateTag(t));
        // Also clear by layout effectively revalidating everything in app router
        revalidatePath('/', 'layout');
        
        return NextResponse.json({
          revalidated: true,
          type: 'tag',
          tag: 'all',
          revalidatedTags: allTags,
          now: Date.now(),
        });
      } else {
        revalidateTag(tag);
        return NextResponse.json({
          revalidated: true,
          type: 'tag',
          tag,
          now: Date.now(),
        });
      }
    } catch (err: any) {
      return NextResponse.json(
        { revalidated: false, message: 'Error revalidating tag.', error: err.message },
        { status: 500 }
      );
    }
  }

  // 3. Revalidate by path (fallback)
  if (path) {
    try {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        type: 'path',
        path,
        now: Date.now(),
      });
    } catch (err: any) {
      return NextResponse.json(
        { revalidated: false, message: 'Error revalidating path.', error: err.message },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { revalidated: false, message: 'No tag or path provided.' },
    { status: 400 }
  );
}
