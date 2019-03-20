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
            $model->syncFbCreate();
        });

        static::updated(function ($model) {
            $model->syncFbUpdate();
        });

        static::deleted(function ($model) {
            $model->syncFbRemove();
        });
    }

    /**
     *
     */
    protected function syncFbCreate()
    {
        $this->syncFbSet();
    }

    /**
     *
     */
    protected function syncFbUpdate()
    {
        $this->syncFbSet();
    }

    /**
     *
     */
    protected function syncFbRemove()
    {
        $this->getModelReference()->remove();
    }

    /**
     *
     */
    protected function syncFbSet()
    {
        $this->getModelReference()->update($this->toArray());
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