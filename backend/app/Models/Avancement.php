<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avancement extends Model
{
    protected $table = 'avancement';

    use HasFactory;
    protected $fillable = [
        'date',
        'text',
        'projet_id',
    ];

    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }
}
