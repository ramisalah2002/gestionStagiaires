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
    ];use HasFactory;

    public function stage()
    {
        return $this->hasMany(Stage::class);
    }
    public function reunion()
    {
        return $this->hasMany(Reunion::class);
    }
}
