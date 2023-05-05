<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrateur extends Model

{
    protected $table = 'administrateur';

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
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function demandeStage()
    {
        return $this->hasMany(DemandeStage::class);
    }

    public function stage()
    {
        return $this->hasMany(Stage::class);
    }
}
