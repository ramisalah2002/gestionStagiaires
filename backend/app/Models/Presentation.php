<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presentation extends Model
{
    protected $table = 'presentation';

    use HasFactory;
    protected $fillable = [
        'date',
        'stage_id',
    ];
    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }
}
