<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipe extends Model
{
    protected $table = 'equipe';

    use HasFactory;
    protected $fillable = [
        'id',
        'nom_equipe',
        'encadrant_id',
    ];

    public function encadrant()
    {
        return $this->belongsTo(Encadrant::class);
    }
    public function stagiaires()
    {
        return $this->hasMany(Stagiaire::class, 'equipe_id');
    }
    public function projets()
    {
        return $this->hasMany(Projet::class, 'equipe_id');
    }



}

