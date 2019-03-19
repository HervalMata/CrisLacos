<?php

use Illuminate\Database\Seeder;
use CrisLacos\Models\ChatGroup;
use Illuminate\Support\Collection;
use Illuminate\Http\UploadedFile;

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
        factory(ChatGroup::class, 10)
            ->make()
            ->each(function ($group) use ($self) {
                ChatGroup::createWithPhoto([
                    'name' => $group->name,
                    'photo' => $self->getUploadFile()
                ]);
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
