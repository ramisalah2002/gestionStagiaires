<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rapport extends Model
{
    protected $table = 'rapport';

    use HasFactory;
    protected $fillable = [
    ];
    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }
}
