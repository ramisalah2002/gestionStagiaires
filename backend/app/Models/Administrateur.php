<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Administrateur extends Authenticatable

{
    protected $table = 'administrateur';

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
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function attestation()
    {
        return $this->hasMany(Attestation::class);
    }
    public function stagiaire()
    {
        return $this->hasMany(Stagiaire::class);
    }
    public function stage()
    {
        return $this->hasMany(Stage::class);
    }
}
