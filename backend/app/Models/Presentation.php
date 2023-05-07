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
        'projet_id',
    ];
    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }
}
