<template>
  <header class="flex justify-between items-center mt-10">
    <div class="flex items-center space-x-2">
      <ClientOnly>
        <img src="/assets/images/logo-180x180.png" alt="Finance Tracker" class="h-8 w-8" />
      </ClientOnly>
      <NuxtLink to="/" class="text-xl font-bold">
        Finance Tracker
      </NuxtLink>
    </div>

    <div>
      <ClientOnly>
        <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-64' }" v-if="user">
          <UAvatar :src="url || false" alt="Avatar" />

          <template #account="{ item }">
            <div class="text-left">
              <p>
                Signed in as
              </p>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ user.email }}
              </p>
            </div>
          </template>

          <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
          </template>
        </UDropdown>
      </ClientOnly>
    </div>
  </header>
</template>

<script lang='ts' setup>
import type { DropdownItem } from '@nuxt/ui/dist/runtime/types';

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { url } = useAvatarUrl()

const items: DropdownItem[][] = [
  [{ label: 'Account', slot: 'account', disabled: true }],
  [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    click: () => navigateTo('/settings/profile')
  },
  {
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: async () => {
      await supabase.auth.signOut()
      return navigateTo('/login')
    }
  }]
]
</script>