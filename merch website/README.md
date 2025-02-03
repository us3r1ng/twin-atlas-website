# Twin Atlas Merch Website - Shopify Theme Files

This directory contains the necessary files for implementing the Twin Atlas merchandise store theme in Shopify.

## File Structure

```
merch website/
├── layout/
│   └── theme.liquid       # Main theme layout
├── sections/
│   ├── game-selector.liquid       # Game selector section with customization options
│   └── game-collection-grid.liquid # Product grid with filtering and sorting
├── snippets/
│   └── game-selector.liquid       # Reusable game selector component
└── templates/
    └── collection.game-selector.liquid  # Collection template with game selector
```

## Implementation Steps

1. Create these files in your Shopify theme editor
2. Copy the contents of each file
3. Configure the sections in your theme customizer
4. Add the game selector section to your collection template

## Required Section Settings

The game selector section needs to be configured with:
- Game titles
- Collection handles (ending in -merch)
- Game icons (optional)

## Notes

- The game selector uses Shopify's native tag-based filtering
- All product collections should end with "-merch" (e.g., "dragon-adventures-merch")
- Products should be tagged with their respective game names
- The collection grid supports sorting and filtering while maintaining game selection 