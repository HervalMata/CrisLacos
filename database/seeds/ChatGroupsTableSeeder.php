<?php

use Illuminate\Database\Seeder;
use CrisLacos\Models\ChatGroup;
use Illuminate\Support\Collection;
use Illuminate\Http\UploadedFile;
use CrisLacos\Models\User;

class ChatGroupsTableSeeder extends Seeder
{
    private $allFakerPhotos;
    private $fakerPhotosPath = 'app/faker/chat_groups';
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->allFakerPhotos = $this->getFakerPhotos();
        $this->deleteAllPhotosInChatGroupsPath();
        $self = $this;
        $customerDefault = User::whereEmail('customer@user.com')->first();
        $otherCustomers = User::whereRole(User::ROLE_CUSTOMER)
            ->whereNotIn('id', [$customerDefault->id])->get();
        factory(ChatGroup::class, 10)
            ->make()
            ->each(function ($group) use ($self, $otherCustomers) {
                ChatGroup::createWithPhoto([
                    'name' => $group->name,
                    'photo' => $self->getUploadFile()
                ]);

                $customersId = $otherCustomers
                    ->random(10)
                    ->pluck('id')
                    ->toArray();

                $group->users()->attach($customersId);
            });
    }

    private function getFakerPhotos() : Collection
    {
        $path = storage_path($this->fakerPhotosPath);
        return collect(\File::allFiles($path));
    }

    private function deleteAllPhotosInChatGroupsPath()
    {
        $path = ChatGroup::CHAT_GROUP_PHOTO_PATH;
        \File::deleteDirectory(storage_path($path), true);
    }

    private function getUploadFile()
    {
        $photoFile = $this->allFakerPhotos->random();
        $uploadFile = new UploadedFile(
            $photoFile->getRealPath(),
            str_random(16) . ',' . $photoFile->getExtension()
        );
    }
}