<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Stagiaire extends Authenticatable
{
    protected $table = 'stagiaire';

    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'id',
        'nom',
        'prenom',
        'email',
        'password',
        'telephone',
        'dateNaissance',
        'genre',
        'status',
        'CIN',
        'CNE',
        'formation',
        'image',
        'couverture',
        'etablissement_id',
        'equipe_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function attestaion()
    {
        return $this->belongsTo(Attestation::class);
    }
    public function administrateur()
    {
        return $this->belongsTo(Administrateur::class);
    }
    public function stage()
    {
        return $this->hasOne(Stage::class);
    }
    public function absences()
    {
        return $this->hasMany(Absence::class);
    }
    public function reunion()
    {
        return $this->belongsToMany(Reunion::class, 'participation');
    }
    public function etablissement()
    {
        return $this->belongsTo(Etablissement::class);
    }
    public function equipe()
    {
        return $this->belongsTo(Equipe::class, 'equipe_id');
    }
}

