<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Realisation extends Model
{
    protected $table = 'realisation';

    use HasFactory;
    protected $fillable = [
        'dateDebut',
        'duree',
        'stagiaire_id',
        'encadrant_id',
    ];
    public function projet()
    {
        return $this->belongsToMany(Projet::class);
    }
    public function stagiaire()
    {
        return $this->belongsToMany(Stagiaire::class);
    }
}
