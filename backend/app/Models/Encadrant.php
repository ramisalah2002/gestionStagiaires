<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Encadrant extends Model
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
    ];use HasFactory;
    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function stage()
    {
        return $this->hasMany(Stage::class);
    }

    public function reunion()
    {
        return $this->hasMany(Reunion::class);
    }
}
