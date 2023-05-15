<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Encadrant extends Utilisateur
{
    protected $table = 'encadrant';

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
        'fonction',
    ];use HasFactory;
    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function stage()
    {
        return $this->hasMany(Stage::class);
    }
    public function reunion()
    {
        return $this->hasMany(Reunion::class);
    }
}
