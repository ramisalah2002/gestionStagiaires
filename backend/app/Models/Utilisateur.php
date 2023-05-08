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
        'CNE',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function demandeStage()
    {
        return $this->hasMany(DemandeStage::class);
    }
}
