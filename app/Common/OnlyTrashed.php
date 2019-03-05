<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 05/03/2019
 * Time: 00:22
 */

namespace CrisLacos\Common;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

trait OnlyTrashed
{
    protected function onlyTrashedIfRequested(Request $request, Builder $query)
    {
        if ($request->get('trashed') == 1) {
            $query = $query->onlyTrashed();
        }

        return $query;
    }
}