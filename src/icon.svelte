
<script>
  import Iconify from '@iconify/iconify';
  import { onMount } from 'svelte'

  onMount(async () => {
    if(!name) return;
    Iconify.preloadImages([name])
    document.addEventListener('IconifyAddedIcons', function() {
      iconData = Iconify.getSVGObject(name)
      iconExists = Iconify.iconExists(name)
    });
  });

  $: iconData = name?Iconify.getSVGObject(name):false
  $: iconExists = name?Iconify.iconExists(name):false

  export let name
</script>

<span class="iconify">
{#if iconExists}
  <svg {...Object.assign({}, iconData.attributes, $$props)}>
    {@html iconData.body }
  </svg>
{/if}
</span>

<style>
  svg{
    height: auto;
  }
</style>
