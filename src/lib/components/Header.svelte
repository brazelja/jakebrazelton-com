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
  <div
    class="ire md:items-items mx-auto flex h-14 w-full items-center justify-between px-4 md:px-8"
  >
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
                class="bg-gradient-to-br from-purple-600 via-purple-400 to-yellow-600 bg-clip-text text-2xl font-bold text-transparent"
              >
                Jake Brazelton
              </a>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <Separator class="my-2" />
        <nav class="mt-[calc(50dvh_-_5rem)] flex -translate-y-1/2 flex-col items-center gap-4">
          <SheetClose>
            <a href="/" class="text-xl font-medium hover:text-purple-400 hover:underline">Home</a>
          </SheetClose>
          <Separator />
          <SheetClose>
            <a href="/about" class="text-xl font-medium hover:text-purple-400 hover:underline">
              About
            </a>
          </SheetClose>
          <Separator />
        </nav>
      </SheetContent>
    </Sheet>
    <!-- Desktop -->
    <a href="/" class="group relative hidden items-center text-2xl font-medium md:flex">
      <span
        class="bg-gradient-to-br from-purple-600 via-purple-400 to-yellow-600 bg-clip-text font-bold transition-colors hover:text-transparent"
      >
        Jake Brazelton
      </span>
    </a>
    <nav class="flex items-center gap-4">
      <a
        href="/about"
        class="hidden text-lg font-medium hover:text-purple-400 hover:underline md:block">About</a
      >
      <ThemeSwitch />
    </nav>
  </div>
</header>
