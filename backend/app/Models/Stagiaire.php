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
        'formation',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function attestaion()
    {
        return $this->belongsTo(Attestation::class);
    }
    public function administrateur()
    {
        return $this->belongsTo(Administrateur::class);
    }
    public function projet()
    {
        return $this->belongsToMany(Projet::class, 'realisation');
    }
    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }
    public function reunion()
    {
        return $this->belongsToMany(Reunion::class, 'participation');
    }
    public function etablissement()
    {
        return $this->belongsTo(Etablissement::class);
    }
}

