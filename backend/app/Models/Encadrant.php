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
        'id',
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

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function reunion()
    {
        return $this->hasMany(Reunion::class);
    }
    public function equipe()
    {
        return $this->hasMany(Equipe::class);
    }
}
