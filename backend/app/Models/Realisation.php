<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Realisation extends Model
{
    use HasFactory;
    protected $fillable = ['stagiaire_id', 'administrateur_id', 'dateDebut', 'duree'];
    public function projet()
    {
        return $this->belongsToMany(Projet::class);
    }
    public function stagiaire()
    {
        return $this->belongsToMany(Stagiaire::class);
    }
}
