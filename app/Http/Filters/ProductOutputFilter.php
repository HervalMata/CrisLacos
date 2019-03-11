<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 09/03/2019
 * Time: 16:44
 */

namespace CrisLacos\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductOutputFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];
    protected $simpleSorts = ['id', 'product.name', 'created_at'];

    /**
     * @param $value
     */
    protected function applySearch($value)
    {
        $this->query->where('name', 'LIKE', "$$value%");
    }

    /**
     * @param $order
     */
    protected function applySortProductName($order)
    {
        $this->query->orderBy('name', $order);
    }

    /**
     * @param $order
     */
    protected function applySortCreatedAt($order)
    {
        $this->query->orderBy('product_outputs.created_at', '$order');
    }

    /**
     * @param $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function apply($query)
    {
        $this->query->select('product_inputs.*')
                    ->join('products', 'products.id', '=', 'product_outputs.product_id');
        return parent::apply($query);
    }
}