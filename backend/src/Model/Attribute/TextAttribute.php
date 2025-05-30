<?php

declare(strict_types=1);

namespace App\Model\Attribute;

class TextAttribute extends AbstractAttribute
{
    public function toArray(): array
    {
        return [
          'id'           => $this->id,
            'name'       => $this->name,
            'type'       => $this->type,
            '__typename' => $this->__typename,
            'items'      => array_map(fn ($item) => [
                'displayValue' => $item['displayValue'],
                'value'        => $item['value'],
                'id'           => $item['item_id'],
                '__typename'   => $item['__typename'] ?? 'Attribute',
            ], $this->items),
        ];
    }
}
