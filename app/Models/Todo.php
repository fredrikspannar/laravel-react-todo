<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

use App\Models\TodoItem;

class Todo extends Model
{
    use HasFactory;
    
    protected $appends = array('total_items', 'completed_items');

    public function getTotalItemsAttribute()
    {
        return $this->items->count();
    }

    public function getCompletedItemsAttribute()
    {
        return $this->items->where('completed','1')->count();
    }

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
