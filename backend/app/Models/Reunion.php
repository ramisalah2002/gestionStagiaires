<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reunion extends Model
{
    protected $table = 'reunion';

    use HasFactory;
    protected $fillable = [
        'date',
        'duree',
        'objet',
        'stagiaire_id',
        'encadrant_id',
    ];
    public function stagiaire()
    {
        return $this->belongsTo(Stagiaire::class);
    }
    public function encadrant()
    {
        return $this->belongsTo(Encadrant::class);
    }
}
