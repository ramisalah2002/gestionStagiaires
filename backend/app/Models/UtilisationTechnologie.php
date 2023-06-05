<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UtilisationTechnologie extends Model
{
    protected $table = 'utilisation_technologie';

    use HasFactory;
    protected $fillable = [
        'projet_id',
        'technologie_id',
    ];

    public function projet()
    {
        return $this->belongsToMany(Projet::class);
    }

    public function technologie()
    {
        return $this->belongsToMany(Technologie::class);
    }
}
