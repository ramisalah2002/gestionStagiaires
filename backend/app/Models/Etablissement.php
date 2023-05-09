<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etablissement extends Model
{
    protected $table = 'etablissement';

    use HasFactory;

    protected $fillable = [
        'nom_etablissement',
        'adresse',
    ];

    public function stagiaire()
    {
        return $this->hasMany(Stagiaire::class);
    }
}
