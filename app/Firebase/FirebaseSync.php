<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 19/03/2019
 * Time: 23:34
 */
declare(strict_types=1);

namespace CrisLacos\Firebase;

use Kreait\Firebase;
use Kreait\Firebase\Database;
use Kreait\Firebase\Database\Reference;

trait FirebaseSync
{
    /**
     *
     */
    public static function bootFirebaseSync()
    {
        static::created(function ($model) {

        });

        static::updated(function ($model) {

        });

        static::deleted(function ($model) {

        });
    }

    /**
     * @return Reference
     */
    protected function getModelReference() : Reference
    {
        $path = $this->getTable() . '/' . $this->getKey();
        return $this->getFirebaseDatabase()->getReference($path);
    }

    /**
     * @return Database
     */
    protected function getFirebaseDatabase() : Database
    {
        $firebase = app(Firebase::class);
        return $firebase->getDatabase();
    }
}