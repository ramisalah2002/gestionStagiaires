<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RapportStage extends Model
{
    protected $table = 'rapportStage';

    use HasFactory;

    protected $fillable = [
        'stage_id',
    ];
    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }
}
