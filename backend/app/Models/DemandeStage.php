<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandeStage extends Model
{
    protected $table = 'demandeStage';

    use HasFactory;
    protected $fillable = [
        'date_demande',
    ];
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }
    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }

    public function administrateur()
    {
        return $this->belongsTo(Administrateur::class);
    }
}
