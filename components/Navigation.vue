<script lang="ts" setup>
import { cn } from "@/lib/utils";

const scrolled = useWindowScroll();
const isScrolled = computed(() => scrolled.y.value > 25);

const { t } = useI18n();
const localePath = useLocalePath();
const navigationItems = [
  {
    label: "Navigation.home",
    href: "/",
  },
  {
    label: "Navigation.advisory-board",
    href: "/advisory-board",
  },
  {
    label: "Navigation.speakers",
    href: "/speakers",
  },
  {
    label: "Navigation.partners",
    href: "/partners",
  },
  {
    label: "Navigation.blog",
    href: "/blog",
  },
  {
    label: "Navigation.contact",
    href: "/contact-us",
  },
];

const isMobileMenuOpen = ref(false);
</script>

<template>
  <div
    :class="
      cn(
        'w-[100%] py-8 sticky top-0 xl:top-4 z-50 backdrop-blur-md bg-background/50   mx-auto px-4 xl:rounded-2xl  my-0 xl:my-6 transition-all ease-in-out duration-300 border border-transparent  ',
        {
          'shadow-lg  xl:!border-white/20 w-full max-w-screen-xl': isScrolled,
        },
        { 'shadow-none xl:!border-transparent max-w-screen-2xl': !isScrolled },
      )
    "
  >
    <div class="h-6 flex items-center justify-between w-[99%] mx-auto">
      <NuxtLink :to="localePath('/')" aria-label="Home">
        <Logo class="w-12" />
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center w-full flex-1 justify-center">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.href"
          :to="localePath(item.href)"
          :aria-label="$t(item.label)"
          :title="$t(item.label)"
        >
          <Button class="text-lg mx-2" variant="ghost">
            {{ $t(item.label) }}
          </Button>
        </NuxtLink>
        <NavigationPreviousEditions />
      </div>

      <div class="items-center lg:flex hidden">
        <NavigationLanguageSelector />
      </div>

      <!-- Mobile Menu Button -->
      <Button
        variant="ghost"
        size="icon"
        class="lg:hidden p-2"
        @click="isMobileMenuOpen = true"
        aria-label="Open menu"
      >
        <Icon name="tabler:menu-2" size="32" />
      </Button>

      <!-- Mobile Navigation Sheet -->
      <Sheet :open="isMobileMenuOpen" @update:open="isMobileMenuOpen = $event">
        <SheetContent class="">
          <SheetHeader>
            <SheetTitle class="text-3xl text-left">
              {{ $t("Navigation.menu") }}
            </SheetTitle>
          </SheetHeader>
          <div class="flex flex-col gap-4 mt-4 -m-2">
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.href"
              :to="localePath(item.href)"
              @click="isMobileMenuOpen = false"
              :aria-label="$t(item.label)"
              :title="$t(item.label)"
            >
              <Button class="w-full text-left text-xl py-4" variant="ghost">
                {{ $t(item.label) }}
              </Button>
            </NuxtLink>
            <NavigationPreviousEditions />
            <NavigationLanguageSelector />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</template>

<style lang="scss"></style>
