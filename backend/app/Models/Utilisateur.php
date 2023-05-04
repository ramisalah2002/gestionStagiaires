<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
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
    public function demandeStage()
    {
        return $this->hasMany(DemandeStage::class);
    }
}
