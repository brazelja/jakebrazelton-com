<script lang="ts">
  import { Button } from '$components/ui/button';
  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from '$components/ui/sheet';
  import { MenuIcon } from 'lucide-svelte';
  import ThemeSwitch from './ThemeSwitch.svelte';
  import Separator from './ui/separator/Separator.svelte';
</script>

<header
  class="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur"
>
  <div class="container px-4 md:px-8 flex h-14 items-baseline justify-between pt-3">
    <!-- Mobile -->
    <Sheet>
      <SheetTrigger class="md:hidden">
        <Button variant="ghost" class="px-2">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent position="left" size="full">
        <SheetHeader>
          <SheetTitle class="h-8">
            <SheetClose>
              <a
                href="/"
                class="text-2xl font-bold bg-gradient-to-br from-purple-600 via-purple-400 to-yellow-600 bg-clip-text text-transparent"
                >Jake Brazelton
              </a>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <Separator class="my-2" />
        <nav class="mt-[calc(50dvh_-_5rem)] -translate-y-1/2 flex flex-col items-center gap-4">
          <SheetClose>
            <a href="/" class="text-xl font-medium hover:underline hover:text-purple-400">Home</a>
          </SheetClose>
          <Separator />
          <SheetClose>
            <a href="/resume" class="text-xl font-medium hover:underline hover:text-purple-400"
              >Resume</a
            >
          </SheetClose>
          <Separator />
        </nav>
      </SheetContent>
    </Sheet>

    <a href="/" class="hidden md:flex group relative items-center text-2xl font-medium">
      <span
        class="font-bold transition-colors bg-gradient-to-br from-purple-600 via-purple-400 to-yellow-600 bg-clip-text hover:text-transparent"
      >
        Jake Brazelton
      </span>
    </a>
    <nav class="flex gap-4">
      <a
        href="/resume"
        class="hidden md:block text-lg font-medium hover:underline hover:text-purple-400">Resume</a
      >
      <ThemeSwitch class="-mt-1" />
    </nav>
  </div>
</header>
