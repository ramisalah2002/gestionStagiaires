<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Stagiaire extends Utilisateur
{
    protected $table = 'stagiaire';

    use HasApiTokens, HasFactory, Notifiable;
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

