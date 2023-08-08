<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        /* 
        has: thiết lập quan hệ
        */
        User::factory(5)->has(
            Task::factory(5)
        )->create();

        // Task::factory(10)->create(); // tạo 10 đối tượng
    }
}
