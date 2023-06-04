<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Encadrant extends Authenticatable
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
        'image',
        'couverture',
    ];use HasFactory;
<<<<<<< HEAD
    protected $hidden = [
        'password',
        'remember_token',
    ];
=======

    public function stage()
    {
        return $this->hasMany(Stage::class);
    }
>>>>>>> c0694d773abfdb7dfd1252ec0424ef2e4de234e8
    public function reunion()
    {
        return $this->hasMany(Reunion::class);
    }
    public function equipe()
    {
        return $this->hasMany(Equipe::class);
    }
}
