<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stagiaire extends Utilisateur
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'telephone',
        'dateNaissance',
        'genre',
        'CIN',
        'CNE',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }
    public function reunion()
    {
        return $this->hasMany(Reunion::class);
    }
    public function projet()
    {
        return $this->hasMany(Projet::class);
    }
}

