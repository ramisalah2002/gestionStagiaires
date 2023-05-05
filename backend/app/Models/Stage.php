<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stage extends Model
{
    protected $table = 'stage';

    use HasFactory;
    protected $fillable = [
        'date_debut',
        'duree',
    ];
    public function stagiaire()
    {
        return $this->belongsTo(Stagiaire::class);
    }
    public function demandeStage()
    {
        return $this->belongsTo(DemandeStage::class);
    }
    public function adminstrateur()
    {
        return $this->belongsTo(Administrateur::class);
    }
    public function projet()
    {
        return $this->hasMany(Projet::class);
    }
    public function encadrant()
    {
        return $this->belongsTo(Encadrant::class);
    }
}
