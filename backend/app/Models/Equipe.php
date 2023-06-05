<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipe extends Model
{
    protected $table = 'equipe';

    use HasFactory;
    protected $fillable = [
        'nom_equipe',
        'stagiaire_id',
        'encadrant_id',
    ];
    public function encadrant()
    {
        return $this->belongsTo(Encadrant::class);
    }
    public function stagiaire()
    {
        return $this->hasMany(Stagiaire::class);
    }
    public function projet()
    {
        return $this->hasMany(Projet::class);
    }
}

