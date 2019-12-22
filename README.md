## Svelte Zondicons

[![npm version](https://img.shields.io/npm/v/svelte-zondicons.svg?style=flat-square)](https://www.npmjs.com/package/svelte-zondicons)


### Installation

```bash
yarn add -D svelte-zondicons
```
or use NPM
```bash
npm install --save-dev svelte-zondicons
```

### Usage

```html
<script>
  // Only import what you need
  import { AirplaneIcon, ArrowLeftIcon, ... } from 'svelte-zondicons';
</script>

<AirplaneIcon />
<ArrowRightIcon class="h-8 w-8 text-gray-800" />

<!-- Or using as custom elements -->
<airplane-icon />
<arrow-left-icon />
```

### Accepted Props
- `class`: Sets `class` attribute
- `size`: Sets `height` and `width` attributes
- `color`: Sets `fill` attribute (Defaults to `currentColor`)

## Credit
- [Zondicons](https://www.zondicons.com/) is a free SVG icon set created by [Steve Schoger](https://twitter.com/steveschoger).
- This package was inspired by:
  - (svelte-feather-icons)[https://github.com/dylanblokhuis/svelte-feather-icons]
  - (svelte-simple-icons)[https://github.com/beyonk-adventures/svelte-simple-icons]
