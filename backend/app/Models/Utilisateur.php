<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Utilisateur extends Model
{
    protected $table = 'utilisateur';

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
        'image',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function mdp_tokens()
    {
        return $this->hasMany(Mdp_tokens::class);
    }
    public function massage()
    {
        return $this->hasMany(Massage::class);
    }
}
