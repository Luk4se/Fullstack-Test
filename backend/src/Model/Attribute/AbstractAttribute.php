<?php

namespace App\Model\Attribute;

abstract class AbstractAttribute {
    protected string $id;
    protected string $name;
    protected string $type;
    protected string $__typename;
    protected array $items;

    public function __construct(array $data, array $items) {
        $this->id = $data['attribute_id'] ?? '';
        $this->name = $data['name'];
        $this->type = $data['type'];
        $this->__typename = $data['__typename'] ?? 'AttributeSet';
        $this->items = $items;
    }
    

    abstract public function toArray(): array;
}
