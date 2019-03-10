<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 09/03/2019
 * Time: 16:44
 */

namespace CrisLacos\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductInputFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];
    protected $simpleSorts = ['id', 'products.name', 'created_at'];

    /**
     * @param $value
     */
    protected function applySearch($query)
    {
        $this->query->select('product_inputs.*')
                    ->join('products', 'products.id', '=', 'product_inputs.product_id');
        return parent::apply($query);
    }
}