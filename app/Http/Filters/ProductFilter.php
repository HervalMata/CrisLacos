<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 09/03/2019
 * Time: 16:44
 */

namespace CrisLacos\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];
    protected $simpleSorts = ['id', 'name', 'price' , 'created_at', 'stock'];

    /**
     * @param $value
     */
    protected function applySearch($value)
    {
        $this->query->where('name', 'LIKE', "%$value%")
                ->orWhere('description', 'LIKE', "%$value%");
    }

    /**
     * @return bool
     */
    protected function hasFilterParamter()
    {
        $contains = $this->parser->getFilters()->contains(function ($filter) {
            return $filter->getField() === 'search' && !empty($filter->getValue());
        });

        return $contains;
    }

}