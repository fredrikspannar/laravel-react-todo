<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

use App\Models\TodoItem;

class Todo extends Model
{
    use HasFactory;

    public function getCreatedAtAttribute($value) {
    	return Carbon::parse($value)->format('Y-m-d H:i:s');
    }
    
    public function getUpdatedAtAttribute($value) {
    	return Carbon::parse($value)->format('Y-m-d H:i:s');
    }

    // list-items
    public function items() {
    	return $this->hasMany(TodoItem::class);
    }

}
