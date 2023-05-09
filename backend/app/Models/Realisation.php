<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Realisation extends Model
{
    protected $table = 'realisation';

    use HasFactory;
    protected $fillable = [
        'dateDebut',
        'duree',
        'note',
        'stagiaire_id',
        'projet_id',
    ];
    public function projet()
    {
        return $this->belongsToMany(Projet::class)->withPivot('note');
    }
    public function stagiaire()
    {
        return $this->belongsToMany(Stagiaire::class);
    }
}
