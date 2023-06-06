<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Technologie extends Model
{
    protected $table = 'technologie';

    use HasFactory;
    protected $fillable = [
        'nom_technologie',
        'image',
    ];

    public function projets()
    {
        return $this->belongsToMany(Projet::class, 'utilisation_technologie', 'technologie_id', 'projet_id');
    }

}
