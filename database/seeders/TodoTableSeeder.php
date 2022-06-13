<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Todo;
use App\Models\TodoItem;

class TodoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        // seed 5 todo lists with items
        for($i=0; $i<5; $i++) {
        	$todo = new Todo();
        	$todo->title = ucfirst(implode(' ', $faker->words(3)));
			$todo->save();

			// create items on that list
			for($n=0; $n<rand(3,15); $n++) {
				$item = new TodoItem();
				$item->todo_id = $todo->id;
				$item->title = ucfirst(implode(' ', $faker->words(rand(1,10))));
				$item->completed = rand(0,1);
				$item->save();
			}
        }
    }
}
