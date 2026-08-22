/* ===== vendor/chess.js ===== */
/* chess.js v1.0.0-beta.8 - MIT License, Copyright (c) Jeff Hlywa
 * Nguon: https://github.com/jhlywa/chess.js
 * Ban CJS goc duoc boc lai thanh bien toan cuc Chess de dung voi the <script>.
 * KHONG SUA NOI DUNG THU VIEN - chi them lop boc o dau va cuoi file.
 */
(function (root) {
  var exports = {};
"use strict";
/**
 * @license
 * Copyright (c) 2023, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chess = exports.validateFen = exports.SQUARES = exports.DEFAULT_POSITION = exports.KING = exports.QUEEN = exports.ROOK = exports.BISHOP = exports.KNIGHT = exports.PAWN = exports.BLACK = exports.WHITE = void 0;
exports.WHITE = 'w';
exports.BLACK = 'b';
exports.PAWN = 'p';
exports.KNIGHT = 'n';
exports.BISHOP = 'b';
exports.ROOK = 'r';
exports.QUEEN = 'q';
exports.KING = 'k';
exports.DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const EMPTY = -1;
const FLAGS = {
    NORMAL: 'n',
    CAPTURE: 'c',
    BIG_PAWN: 'b',
    EP_CAPTURE: 'e',
    PROMOTION: 'p',
    KSIDE_CASTLE: 'k',
    QSIDE_CASTLE: 'q',
};
// prettier-ignore
exports.SQUARES = [
    'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
    'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
    'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
    'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
    'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
    'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
    'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
    'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
];
const BITS = {
    NORMAL: 1,
    CAPTURE: 2,
    BIG_PAWN: 4,
    EP_CAPTURE: 8,
    PROMOTION: 16,
    KSIDE_CASTLE: 32,
    QSIDE_CASTLE: 64,
};
/*
 * NOTES ABOUT 0x88 MOVE GENERATION ALGORITHM
 * ----------------------------------------------------------------------------
 * From https://github.com/jhlywa/chess.js/issues/230
 *
 * A lot of people are confused when they first see the internal representation
 * of chess.js. It uses the 0x88 Move Generation Algorithm which internally
 * stores the board as an 8x16 array. This is purely for efficiency but has a
 * couple of interesting benefits:
 *
 * 1. 0x88 offers a very inexpensive "off the board" check. Bitwise AND (&) any
 *    square with 0x88, if the result is non-zero then the square is off the
 *    board. For example, assuming a knight square A8 (0 in 0x88 notation),
 *    there are 8 possible directions in which the knight can move. These
 *    directions are relative to the 8x16 board and are stored in the
 *    PIECE_OFFSETS map. One possible move is A8 - 18 (up one square, and two
 *    squares to the left - which is off the board). 0 - 18 = -18 & 0x88 = 0x88
 *    (because of two-complement representation of -18). The non-zero result
 *    means the square is off the board and the move is illegal. Take the
 *    opposite move (from A8 to C7), 0 + 18 = 18 & 0x88 = 0. A result of zero
 *    means the square is on the board.
 *
 * 2. The relative distance (or difference) between two squares on a 8x16 board
 *    is unique and can be used to inexpensively determine if a piece on a
 *    square can attack any other arbitrary square. For example, let's see if a
 *    pawn on E7 can attack E2. The difference between E7 (20) - E2 (100) is
 *    -80. We add 119 to make the ATTACKS array index non-negative (because the
 *    worst case difference is A8 - H1 = -119). The ATTACKS array contains a
 *    bitmask of pieces that can attack from that distance and direction.
 *    ATTACKS[-80 + 119=39] gives us 24 or 0b11000 in binary. Look at the
 *    PIECE_MASKS map to determine the mask for a given piece type. In our pawn
 *    example, we would check to see if 24 & 0x1 is non-zero, which it is
 *    not. So, naturally, a pawn on E7 can't attack a piece on E2. However, a
 *    rook can since 24 & 0x8 is non-zero. The only thing left to check is that
 *    there are no blocking pieces between E7 and E2. That's where the RAYS
 *    array comes in. It provides an offset (in this case 16) to add to E7 (20)
 *    to check for blocking pieces. E7 (20) + 16 = E6 (36) + 16 = E5 (52) etc.
 */
// prettier-ignore
// eslint-disable-next-line
const Ox88 = {
    a8: 0, b8: 1, c8: 2, d8: 3, e8: 4, f8: 5, g8: 6, h8: 7,
    a7: 16, b7: 17, c7: 18, d7: 19, e7: 20, f7: 21, g7: 22, h7: 23,
    a6: 32, b6: 33, c6: 34, d6: 35, e6: 36, f6: 37, g6: 38, h6: 39,
    a5: 48, b5: 49, c5: 50, d5: 51, e5: 52, f5: 53, g5: 54, h5: 55,
    a4: 64, b4: 65, c4: 66, d4: 67, e4: 68, f4: 69, g4: 70, h4: 71,
    a3: 80, b3: 81, c3: 82, d3: 83, e3: 84, f3: 85, g3: 86, h3: 87,
    a2: 96, b2: 97, c2: 98, d2: 99, e2: 100, f2: 101, g2: 102, h2: 103,
    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
};
const PAWN_OFFSETS = {
    b: [16, 32, 17, 15],
    w: [-16, -32, -17, -15],
};
const PIECE_OFFSETS = {
    n: [-18, -33, -31, -14, 18, 33, 31, 14],
    b: [-17, -15, 17, 15],
    r: [-16, 1, 16, -1],
    q: [-17, -16, -15, 1, 17, 16, 15, -1],
    k: [-17, -16, -15, 1, 17, 16, 15, -1],
};
// prettier-ignore
const ATTACKS = [
    20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20, 0,
    0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0,
    0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0,
    0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0,
    0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    24, 24, 24, 24, 24, 24, 56, 0, 56, 24, 24, 24, 24, 24, 24, 0,
    0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0,
    0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0,
    0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0,
    0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0,
    20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20
];
// prettier-ignore
const RAYS = [
    17, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 15, 0,
    0, 17, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 15, 0, 0,
    0, 0, 17, 0, 0, 0, 0, 16, 0, 0, 0, 0, 15, 0, 0, 0,
    0, 0, 0, 17, 0, 0, 0, 16, 0, 0, 0, 15, 0, 0, 0, 0,
    0, 0, 0, 0, 17, 0, 0, 16, 0, 0, 15, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 17, 0, 16, 0, 15, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 17, 16, 15, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1, 0,
    0, 0, 0, 0, 0, 0, -15, -16, -17, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -15, 0, -16, 0, -17, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -15, 0, 0, -16, 0, 0, -17, 0, 0, 0, 0, 0,
    0, 0, 0, -15, 0, 0, 0, -16, 0, 0, 0, -17, 0, 0, 0, 0,
    0, 0, -15, 0, 0, 0, 0, -16, 0, 0, 0, 0, -17, 0, 0, 0,
    0, -15, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, -17, 0, 0,
    -15, 0, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, 0, -17
];
const PIECE_MASKS = { p: 0x1, n: 0x2, b: 0x4, r: 0x8, q: 0x10, k: 0x20 };
const SYMBOLS = 'pnbrqkPNBRQK';
const PROMOTIONS = [exports.KNIGHT, exports.BISHOP, exports.ROOK, exports.QUEEN];
const RANK_1 = 7;
const RANK_2 = 6;
/*
 * const RANK_3 = 5
 * const RANK_4 = 4
 * const RANK_5 = 3
 * const RANK_6 = 2
 */
const RANK_7 = 1;
const RANK_8 = 0;
const SIDES = {
    [exports.KING]: BITS.KSIDE_CASTLE,
    [exports.QUEEN]: BITS.QSIDE_CASTLE,
};
const ROOKS = {
    w: [
        { square: Ox88.a1, flag: BITS.QSIDE_CASTLE },
        { square: Ox88.h1, flag: BITS.KSIDE_CASTLE },
    ],
    b: [
        { square: Ox88.a8, flag: BITS.QSIDE_CASTLE },
        { square: Ox88.h8, flag: BITS.KSIDE_CASTLE },
    ],
};
const SECOND_RANK = { b: RANK_7, w: RANK_2 };
const TERMINATION_MARKERS = ['1-0', '0-1', '1/2-1/2', '*'];
// Extracts the zero-based rank of an 0x88 square.
function rank(square) {
    return square >> 4;
}
// Extracts the zero-based file of an 0x88 square.
function file(square) {
    return square & 0xf;
}
function isDigit(c) {
    return '0123456789'.indexOf(c) !== -1;
}
// Converts a 0x88 square to algebraic notation.
function algebraic(square) {
    const f = file(square);
    const r = rank(square);
    return ('abcdefgh'.substring(f, f + 1) +
        '87654321'.substring(r, r + 1));
}
function swapColor(color) {
    return color === exports.WHITE ? exports.BLACK : exports.WHITE;
}
function validateFen(fen) {
    // 1st criterion: 6 space-seperated fields?
    const tokens = fen.split(/\s+/);
    if (tokens.length !== 6) {
        return {
            ok: false,
            error: 'Invalid FEN: must contain six space-delimited fields',
        };
    }
    // 2nd criterion: move number field is a integer value > 0?
    const moveNumber = parseInt(tokens[5], 10);
    if (isNaN(moveNumber) || moveNumber <= 0) {
        return {
            ok: false,
            error: 'Invalid FEN: move number must be a positive integer',
        };
    }
    // 3rd criterion: half move counter is an integer >= 0?
    const halfMoves = parseInt(tokens[4], 10);
    if (isNaN(halfMoves) || halfMoves < 0) {
        return {
            ok: false,
            error: 'Invalid FEN: half move counter number must be a non-negative integer',
        };
    }
    // 4th criterion: 4th field is a valid e.p.-string?
    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
        return { ok: false, error: 'Invalid FEN: en-passant square is invalid' };
    }
    // 5th criterion: 3th field is a valid castle-string?
    if (/[^kKqQ-]/.test(tokens[2])) {
        return { ok: false, error: 'Invalid FEN: castling availability is invalid' };
    }
    // 6th criterion: 2nd field is "w" (white) or "b" (black)?
    if (!/^(w|b)$/.test(tokens[1])) {
        return { ok: false, error: 'Invalid FEN: side-to-move is invalid' };
    }
    // 7th criterion: 1st field contains 8 rows?
    const rows = tokens[0].split('/');
    if (rows.length !== 8) {
        return {
            ok: false,
            error: "Invalid FEN: piece data does not contain 8 '/'-delimited rows",
        };
    }
    // 8th criterion: every row is valid?
    for (let i = 0; i < rows.length; i++) {
        // check for right sum of fields AND not two numbers in succession
        let sumFields = 0;
        let previousWasNumber = false;
        for (let k = 0; k < rows[i].length; k++) {
            if (isDigit(rows[i][k])) {
                if (previousWasNumber) {
                    return {
                        ok: false,
                        error: 'Invalid FEN: piece data is invalid (consecutive number)',
                    };
                }
                sumFields += parseInt(rows[i][k], 10);
                previousWasNumber = true;
            }
            else {
                if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
                    return {
                        ok: false,
                        error: 'Invalid FEN: piece data is invalid (invalid piece)',
                    };
                }
                sumFields += 1;
                previousWasNumber = false;
            }
        }
        if (sumFields !== 8) {
            return {
                ok: false,
                error: 'Invalid FEN: piece data is invalid (too many squares in rank)',
            };
        }
    }
    // 9th criterion: is en-passant square legal?
    if ((tokens[3][1] == '3' && tokens[1] == 'w') ||
        (tokens[3][1] == '6' && tokens[1] == 'b')) {
        return { ok: false, error: 'Invalid FEN: illegal en-passant square' };
    }
    // 10th criterion: does chess position contain exact two kings?
    const kings = [
        { color: 'white', regex: /K/g },
        { color: 'black', regex: /k/g },
    ];
    for (const { color, regex } of kings) {
        if (!regex.test(tokens[0])) {
            return { ok: false, error: `Invalid FEN: missing ${color} king` };
        }
        if ((tokens[0].match(regex) || []).length > 1) {
            return { ok: false, error: `Invalid FEN: too many ${color} kings` };
        }
    }
    // 11th criterion: are any pawns on the first or eighth rows?
    if (Array.from(rows[0] + rows[7]).some((char) => char.toUpperCase() === 'P')) {
        return {
            ok: false,
            error: 'Invalid FEN: some pawns are on the edge rows',
        };
    }
    return { ok: true };
}
exports.validateFen = validateFen;
// this function is used to uniquely identify ambiguous moves
function getDisambiguator(move, moves) {
    const from = move.from;
    const to = move.to;
    const piece = move.piece;
    let ambiguities = 0;
    let sameRank = 0;
    let sameFile = 0;
    for (let i = 0, len = moves.length; i < len; i++) {
        const ambigFrom = moves[i].from;
        const ambigTo = moves[i].to;
        const ambigPiece = moves[i].piece;
        /*
         * if a move of the same piece type ends on the same to square, we'll need
         * to add a disambiguator to the algebraic notation
         */
        if (piece === ambigPiece && from !== ambigFrom && to === ambigTo) {
            ambiguities++;
            if (rank(from) === rank(ambigFrom)) {
                sameRank++;
            }
            if (file(from) === file(ambigFrom)) {
                sameFile++;
            }
        }
    }
    if (ambiguities > 0) {
        if (sameRank > 0 && sameFile > 0) {
            /*
             * if there exists a similar moving piece on the same rank and file as
             * the move in question, use the square as the disambiguator
             */
            return algebraic(from);
        }
        else if (sameFile > 0) {
            /*
             * if the moving piece rests on the same file, use the rank symbol as the
             * disambiguator
             */
            return algebraic(from).charAt(1);
        }
        else {
            // else use the file symbol
            return algebraic(from).charAt(0);
        }
    }
    return '';
}
function addMove(moves, color, from, to, piece, captured = undefined, flags = BITS.NORMAL) {
    const r = rank(to);
    if (piece === exports.PAWN && (r === RANK_1 || r === RANK_8)) {
        for (let i = 0; i < PROMOTIONS.length; i++) {
            const promotion = PROMOTIONS[i];
            moves.push({
                color,
                from,
                to,
                piece,
                captured,
                promotion,
                flags: flags | BITS.PROMOTION,
            });
        }
    }
    else {
        moves.push({
            color,
            from,
            to,
            piece,
            captured,
            flags,
        });
    }
}
function inferPieceType(san) {
    let pieceType = san.charAt(0);
    if (pieceType >= 'a' && pieceType <= 'h') {
        const matches = san.match(/[a-h]\d.*[a-h]\d/);
        if (matches) {
            return undefined;
        }
        return exports.PAWN;
    }
    pieceType = pieceType.toLowerCase();
    if (pieceType === 'o') {
        return exports.KING;
    }
    return pieceType;
}
// parses all of the decorators out of a SAN string
function strippedSan(move) {
    return move.replace(/=/, '').replace(/[+#]?[?!]*$/, '');
}
function trimFen(fen) {
    /*
     * remove last two fields in FEN string as they're not needed when checking
     * for repetition
     */
    return fen.split(' ').slice(0, 4).join(' ');
}
class Chess {
    _board = new Array(128);
    _turn = exports.WHITE;
    _header = {};
    _kings = { w: EMPTY, b: EMPTY };
    _epSquare = -1;
    _halfMoves = 0;
    _moveNumber = 0;
    _history = [];
    _comments = {};
    _castling = { w: 0, b: 0 };
    // tracks number of times a position has been seen for repetition checking
    _positionCount = {};
    constructor(fen = exports.DEFAULT_POSITION) {
        this.load(fen);
    }
    clear({ preserveHeaders = false } = {}) {
        this._board = new Array(128);
        this._kings = { w: EMPTY, b: EMPTY };
        this._turn = exports.WHITE;
        this._castling = { w: 0, b: 0 };
        this._epSquare = EMPTY;
        this._halfMoves = 0;
        this._moveNumber = 1;
        this._history = [];
        this._comments = {};
        this._header = preserveHeaders ? this._header : {};
        this._positionCount = {};
        /*
         * Delete the SetUp and FEN headers (if preserved), the board is empty and
         * these headers don't make sense in this state. They'll get added later
         * via .load() or .put()
         */
        delete this._header['SetUp'];
        delete this._header['FEN'];
    }
    removeHeader(key) {
        if (key in this._header) {
            delete this._header[key];
        }
    }
    load(fen, { skipValidation = false, preserveHeaders = false } = {}) {
        let tokens = fen.split(/\s+/);
        // append commonly omitted fen tokens
        if (tokens.length >= 2 && tokens.length < 6) {
            const adjustments = ['-', '-', '0', '1'];
            fen = tokens.concat(adjustments.slice(-(6 - tokens.length))).join(' ');
        }
        tokens = fen.split(/\s+/);
        if (!skipValidation) {
            const { ok, error } = validateFen(fen);
            if (!ok) {
                throw new Error(error);
            }
        }
        const position = tokens[0];
        let square = 0;
        this.clear({ preserveHeaders });
        for (let i = 0; i < position.length; i++) {
            const piece = position.charAt(i);
            if (piece === '/') {
                square += 8;
            }
            else if (isDigit(piece)) {
                square += parseInt(piece, 10);
            }
            else {
                const color = piece < 'a' ? exports.WHITE : exports.BLACK;
                this._put({ type: piece.toLowerCase(), color }, algebraic(square));
                square++;
            }
        }
        this._turn = tokens[1];
        if (tokens[2].indexOf('K') > -1) {
            this._castling.w |= BITS.KSIDE_CASTLE;
        }
        if (tokens[2].indexOf('Q') > -1) {
            this._castling.w |= BITS.QSIDE_CASTLE;
        }
        if (tokens[2].indexOf('k') > -1) {
            this._castling.b |= BITS.KSIDE_CASTLE;
        }
        if (tokens[2].indexOf('q') > -1) {
            this._castling.b |= BITS.QSIDE_CASTLE;
        }
        this._epSquare = tokens[3] === '-' ? EMPTY : Ox88[tokens[3]];
        this._halfMoves = parseInt(tokens[4], 10);
        this._moveNumber = parseInt(tokens[5], 10);
        this._updateSetup(fen);
        this._incPositionCount(fen);
    }
    fen() {
        let empty = 0;
        let fen = '';
        for (let i = Ox88.a8; i <= Ox88.h1; i++) {
            if (this._board[i]) {
                if (empty > 0) {
                    fen += empty;
                    empty = 0;
                }
                const { color, type: piece } = this._board[i];
                fen += color === exports.WHITE ? piece.toUpperCase() : piece.toLowerCase();
            }
            else {
                empty++;
            }
            if ((i + 1) & 0x88) {
                if (empty > 0) {
                    fen += empty;
                }
                if (i !== Ox88.h1) {
                    fen += '/';
                }
                empty = 0;
                i += 8;
            }
        }
        let castling = '';
        if (this._castling[exports.WHITE] & BITS.KSIDE_CASTLE) {
            castling += 'K';
        }
        if (this._castling[exports.WHITE] & BITS.QSIDE_CASTLE) {
            castling += 'Q';
        }
        if (this._castling[exports.BLACK] & BITS.KSIDE_CASTLE) {
            castling += 'k';
        }
        if (this._castling[exports.BLACK] & BITS.QSIDE_CASTLE) {
            castling += 'q';
        }
        // do we have an empty castling flag?
        castling = castling || '-';
        let epSquare = '-';
        /*
         * only print the ep square if en passant is a valid move (pawn is present
         * and ep capture is not pinned)
         */
        if (this._epSquare !== EMPTY) {
            const bigPawnSquare = this._epSquare + (this._turn === exports.WHITE ? 16 : -16);
            const squares = [bigPawnSquare + 1, bigPawnSquare - 1];
            for (const square of squares) {
                // is the square off the board?
                if (square & 0x88) {
                    continue;
                }
                const color = this._turn;
                // is there a pawn that can capture the epSquare?
                if (this._board[square]?.color === color &&
                    this._board[square]?.type === exports.PAWN) {
                    // if the pawn makes an ep capture, does it leave it's king in check?
                    this._makeMove({
                        color,
                        from: square,
                        to: this._epSquare,
                        piece: exports.PAWN,
                        captured: exports.PAWN,
                        flags: BITS.EP_CAPTURE,
                    });
                    const isLegal = !this._isKingAttacked(color);
                    this._undoMove();
                    // if ep is legal, break and set the ep square in the FEN output
                    if (isLegal) {
                        epSquare = algebraic(this._epSquare);
                        break;
                    }
                }
            }
        }
        return [
            fen,
            this._turn,
            castling,
            epSquare,
            this._halfMoves,
            this._moveNumber,
        ].join(' ');
    }
    /*
     * Called when the initial board setup is changed with put() or remove().
     * modifies the SetUp and FEN properties of the header object. If the FEN
     * is equal to the default position, the SetUp and FEN are deleted the setup
     * is only updated if history.length is zero, ie moves haven't been made.
     */
    _updateSetup(fen) {
        if (this._history.length > 0)
            return;
        if (fen !== exports.DEFAULT_POSITION) {
            this._header['SetUp'] = '1';
            this._header['FEN'] = fen;
        }
        else {
            delete this._header['SetUp'];
            delete this._header['FEN'];
        }
    }
    reset() {
        this.load(exports.DEFAULT_POSITION);
    }
    get(square) {
        return this._board[Ox88[square]] || false;
    }
    put({ type, color }, square) {
        if (this._put({ type, color }, square)) {
            this._updateCastlingRights();
            this._updateEnPassantSquare();
            this._updateSetup(this.fen());
            return true;
        }
        return false;
    }
    _put({ type, color }, square) {
        // check for piece
        if (SYMBOLS.indexOf(type.toLowerCase()) === -1) {
            return false;
        }
        // check for valid square
        if (!(square in Ox88)) {
            return false;
        }
        const sq = Ox88[square];
        // don't let the user place more than one king
        if (type == exports.KING &&
            !(this._kings[color] == EMPTY || this._kings[color] == sq)) {
            return false;
        }
        const currentPieceOnSquare = this._board[sq];
        // if one of the kings will be replaced by the piece from args, set the `_kings` respective entry to `EMPTY`
        if (currentPieceOnSquare && currentPieceOnSquare.type === exports.KING) {
            this._kings[currentPieceOnSquare.color] = EMPTY;
        }
        this._board[sq] = { type: type, color: color };
        if (type === exports.KING) {
            this._kings[color] = sq;
        }
        return true;
    }
    remove(square) {
        const piece = this.get(square);
        delete this._board[Ox88[square]];
        if (piece && piece.type === exports.KING) {
            this._kings[piece.color] = EMPTY;
        }
        this._updateCastlingRights();
        this._updateEnPassantSquare();
        this._updateSetup(this.fen());
        return piece;
    }
    _updateCastlingRights() {
        const whiteKingInPlace = this._board[Ox88.e1]?.type === exports.KING &&
            this._board[Ox88.e1]?.color === exports.WHITE;
        const blackKingInPlace = this._board[Ox88.e8]?.type === exports.KING &&
            this._board[Ox88.e8]?.color === exports.BLACK;
        if (!whiteKingInPlace ||
            this._board[Ox88.a1]?.type !== exports.ROOK ||
            this._board[Ox88.a1]?.color !== exports.WHITE) {
            this._castling.w &= ~BITS.QSIDE_CASTLE;
        }
        if (!whiteKingInPlace ||
            this._board[Ox88.h1]?.type !== exports.ROOK ||
            this._board[Ox88.h1]?.color !== exports.WHITE) {
            this._castling.w &= ~BITS.KSIDE_CASTLE;
        }
        if (!blackKingInPlace ||
            this._board[Ox88.a8]?.type !== exports.ROOK ||
            this._board[Ox88.a8]?.color !== exports.BLACK) {
            this._castling.b &= ~BITS.QSIDE_CASTLE;
        }
        if (!blackKingInPlace ||
            this._board[Ox88.h8]?.type !== exports.ROOK ||
            this._board[Ox88.h8]?.color !== exports.BLACK) {
            this._castling.b &= ~BITS.KSIDE_CASTLE;
        }
    }
    _updateEnPassantSquare() {
        if (this._epSquare === EMPTY) {
            return;
        }
        const startSquare = this._epSquare + (this._turn === exports.WHITE ? -16 : 16);
        const currentSquare = this._epSquare + (this._turn === exports.WHITE ? 16 : -16);
        const attackers = [currentSquare + 1, currentSquare - 1];
        if (this._board[startSquare] !== null ||
            this._board[this._epSquare] !== null ||
            this._board[currentSquare]?.color !== swapColor(this._turn) ||
            this._board[currentSquare]?.type !== exports.PAWN) {
            this._epSquare = EMPTY;
            return;
        }
        const canCapture = (square) => !(square & 0x88) &&
            this._board[square]?.color === this._turn &&
            this._board[square]?.type === exports.PAWN;
        if (!attackers.some(canCapture)) {
            this._epSquare = EMPTY;
        }
    }
    _attacked(color, square) {
        for (let i = Ox88.a8; i <= Ox88.h1; i++) {
            // did we run off the end of the board
            if (i & 0x88) {
                i += 7;
                continue;
            }
            // if empty square or wrong color
            if (this._board[i] === undefined || this._board[i].color !== color) {
                continue;
            }
            const piece = this._board[i];
            const difference = i - square;
            // skip - to/from square are the same
            if (difference === 0) {
                continue;
            }
            const index = difference + 119;
            if (ATTACKS[index] & PIECE_MASKS[piece.type]) {
                if (piece.type === exports.PAWN) {
                    if (difference > 0) {
                        if (piece.color === exports.WHITE)
                            return true;
                    }
                    else {
                        if (piece.color === exports.BLACK)
                            return true;
                    }
                    continue;
                }
                // if the piece is a knight or a king
                if (piece.type === 'n' || piece.type === 'k')
                    return true;
                const offset = RAYS[index];
                let j = i + offset;
                let blocked = false;
                while (j !== square) {
                    if (this._board[j] != null) {
                        blocked = true;
                        break;
                    }
                    j += offset;
                }
                if (!blocked)
                    return true;
            }
        }
        return false;
    }
    _isKingAttacked(color) {
        const square = this._kings[color];
        return square === -1 ? false : this._attacked(swapColor(color), square);
    }
    isAttacked(square, attackedBy) {
        return this._attacked(attackedBy, Ox88[square]);
    }
    isCheck() {
        return this._isKingAttacked(this._turn);
    }
    inCheck() {
        return this.isCheck();
    }
    isCheckmate() {
        return this.isCheck() && this._moves().length === 0;
    }
    isStalemate() {
        return !this.isCheck() && this._moves().length === 0;
    }
    isInsufficientMaterial() {
        /*
         * k.b. vs k.b. (of opposite colors) with mate in 1:
         * 8/8/8/8/1b6/8/B1k5/K7 b - - 0 1
         *
         * k.b. vs k.n. with mate in 1:
         * 8/8/8/8/1n6/8/B7/K1k5 b - - 2 1
         */
        const pieces = {
            b: 0,
            n: 0,
            r: 0,
            q: 0,
            k: 0,
            p: 0,
        };
        const bishops = [];
        let numPieces = 0;
        let squareColor = 0;
        for (let i = Ox88.a8; i <= Ox88.h1; i++) {
            squareColor = (squareColor + 1) % 2;
            if (i & 0x88) {
                i += 7;
                continue;
            }
            const piece = this._board[i];
            if (piece) {
                pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1;
                if (piece.type === exports.BISHOP) {
                    bishops.push(squareColor);
                }
                numPieces++;
            }
        }
        // k vs. k
        if (numPieces === 2) {
            return true;
        }
        else if (
        // k vs. kn .... or .... k vs. kb
        numPieces === 3 &&
            (pieces[exports.BISHOP] === 1 || pieces[exports.KNIGHT] === 1)) {
            return true;
        }
        else if (numPieces === pieces[exports.BISHOP] + 2) {
            // kb vs. kb where any number of bishops are all on the same color
            let sum = 0;
            const len = bishops.length;
            for (let i = 0; i < len; i++) {
                sum += bishops[i];
            }
            if (sum === 0 || sum === len) {
                return true;
            }
        }
        return false;
    }
    isThreefoldRepetition() {
        return this._getPositionCount(this.fen()) >= 3;
    }
    isDraw() {
        return (this._halfMoves >= 100 || // 50 moves per side = 100 half moves
            this.isStalemate() ||
            this.isInsufficientMaterial() ||
            this.isThreefoldRepetition());
    }
    isGameOver() {
        return this.isCheckmate() || this.isStalemate() || this.isDraw();
    }
    moves({ verbose = false, square = undefined, piece = undefined, } = {}) {
        const moves = this._moves({ square, piece });
        if (verbose) {
            return moves.map((move) => this._makePretty(move));
        }
        else {
            return moves.map((move) => this._moveToSan(move, moves));
        }
    }
    _moves({ legal = true, piece = undefined, square = undefined, } = {}) {
        const forSquare = square ? square.toLowerCase() : undefined;
        const forPiece = piece?.toLowerCase();
        const moves = [];
        const us = this._turn;
        const them = swapColor(us);
        let firstSquare = Ox88.a8;
        let lastSquare = Ox88.h1;
        let singleSquare = false;
        // are we generating moves for a single square?
        if (forSquare) {
            // illegal square, return empty moves
            if (!(forSquare in Ox88)) {
                return [];
            }
            else {
                firstSquare = lastSquare = Ox88[forSquare];
                singleSquare = true;
            }
        }
        for (let from = firstSquare; from <= lastSquare; from++) {
            // did we run off the end of the board
            if (from & 0x88) {
                from += 7;
                continue;
            }
            // empty square or opponent, skip
            if (!this._board[from] || this._board[from].color === them) {
                continue;
            }
            const { type } = this._board[from];
            let to;
            if (type === exports.PAWN) {
                if (forPiece && forPiece !== type)
                    continue;
                // single square, non-capturing
                to = from + PAWN_OFFSETS[us][0];
                if (!this._board[to]) {
                    addMove(moves, us, from, to, exports.PAWN);
                    // double square
                    to = from + PAWN_OFFSETS[us][1];
                    if (SECOND_RANK[us] === rank(from) && !this._board[to]) {
                        addMove(moves, us, from, to, exports.PAWN, undefined, BITS.BIG_PAWN);
                    }
                }
                // pawn captures
                for (let j = 2; j < 4; j++) {
                    to = from + PAWN_OFFSETS[us][j];
                    if (to & 0x88)
                        continue;
                    if (this._board[to]?.color === them) {
                        addMove(moves, us, from, to, exports.PAWN, this._board[to].type, BITS.CAPTURE);
                    }
                    else if (to === this._epSquare) {
                        addMove(moves, us, from, to, exports.PAWN, exports.PAWN, BITS.EP_CAPTURE);
                    }
                }
            }
            else {
                if (forPiece && forPiece !== type)
                    continue;
                for (let j = 0, len = PIECE_OFFSETS[type].length; j < len; j++) {
                    const offset = PIECE_OFFSETS[type][j];
                    to = from;
                    while (true) {
                        to += offset;
                        if (to & 0x88)
                            break;
                        if (!this._board[to]) {
                            addMove(moves, us, from, to, type);
                        }
                        else {
                            // own color, stop loop
                            if (this._board[to].color === us)
                                break;
                            addMove(moves, us, from, to, type, this._board[to].type, BITS.CAPTURE);
                            break;
                        }
                        /* break, if knight or king */
                        if (type === exports.KNIGHT || type === exports.KING)
                            break;
                    }
                }
            }
        }
        /*
         * check for castling if we're:
         *   a) generating all moves, or
         *   b) doing single square move generation on the king's square
         */
        if (forPiece === undefined || forPiece === exports.KING) {
            if (!singleSquare || lastSquare === this._kings[us]) {
                // king-side castling
                if (this._castling[us] & BITS.KSIDE_CASTLE) {
                    const castlingFrom = this._kings[us];
                    const castlingTo = castlingFrom + 2;
                    if (!this._board[castlingFrom + 1] &&
                        !this._board[castlingTo] &&
                        !this._attacked(them, this._kings[us]) &&
                        !this._attacked(them, castlingFrom + 1) &&
                        !this._attacked(them, castlingTo)) {
                        addMove(moves, us, this._kings[us], castlingTo, exports.KING, undefined, BITS.KSIDE_CASTLE);
                    }
                }
                // queen-side castling
                if (this._castling[us] & BITS.QSIDE_CASTLE) {
                    const castlingFrom = this._kings[us];
                    const castlingTo = castlingFrom - 2;
                    if (!this._board[castlingFrom - 1] &&
                        !this._board[castlingFrom - 2] &&
                        !this._board[castlingFrom - 3] &&
                        !this._attacked(them, this._kings[us]) &&
                        !this._attacked(them, castlingFrom - 1) &&
                        !this._attacked(them, castlingTo)) {
                        addMove(moves, us, this._kings[us], castlingTo, exports.KING, undefined, BITS.QSIDE_CASTLE);
                    }
                }
            }
        }
        /*
         * return all pseudo-legal moves (this includes moves that allow the king
         * to be captured)
         */
        if (!legal || this._kings[us] === -1) {
            return moves;
        }
        // filter out illegal moves
        const legalMoves = [];
        for (let i = 0, len = moves.length; i < len; i++) {
            this._makeMove(moves[i]);
            if (!this._isKingAttacked(us)) {
                legalMoves.push(moves[i]);
            }
            this._undoMove();
        }
        return legalMoves;
    }
    move(move, { strict = false } = {}) {
        /*
         * The move function can be called with in the following parameters:
         *
         * .move('Nxb7')       <- argument is a case-sensitive SAN string
         *
         * .move({ from: 'h7', <- argument is a move object
         *         to :'h8',
         *         promotion: 'q' })
         *
         *
         * An optional strict argument may be supplied to tell chess.js to
         * strictly follow the SAN specification.
         */
        let moveObj = null;
        if (typeof move === 'string') {
            moveObj = this._moveFromSan(move, strict);
        }
        else if (typeof move === 'object') {
            const moves = this._moves();
            // convert the pretty move object to an ugly move object
            for (let i = 0, len = moves.length; i < len; i++) {
                if (move.from === algebraic(moves[i].from) &&
                    move.to === algebraic(moves[i].to) &&
                    (!('promotion' in moves[i]) || move.promotion === moves[i].promotion)) {
                    moveObj = moves[i];
                    break;
                }
            }
        }
        // failed to find move
        if (!moveObj) {
            if (typeof move === 'string') {
                throw new Error(`Invalid move: ${move}`);
            }
            else {
                throw new Error(`Invalid move: ${JSON.stringify(move)}`);
            }
        }
        /*
         * need to make a copy of move because we can't generate SAN after the move
         * is made
         */
        const prettyMove = this._makePretty(moveObj);
        this._makeMove(moveObj);
        this._incPositionCount(prettyMove.after);
        return prettyMove;
    }
    _push(move) {
        this._history.push({
            move,
            kings: { b: this._kings.b, w: this._kings.w },
            turn: this._turn,
            castling: { b: this._castling.b, w: this._castling.w },
            epSquare: this._epSquare,
            halfMoves: this._halfMoves,
            moveNumber: this._moveNumber,
        });
    }
    _makeMove(move) {
        const us = this._turn;
        const them = swapColor(us);
        this._push(move);
        this._board[move.to] = this._board[move.from];
        delete this._board[move.from];
        // if ep capture, remove the captured pawn
        if (move.flags & BITS.EP_CAPTURE) {
            if (this._turn === exports.BLACK) {
                delete this._board[move.to - 16];
            }
            else {
                delete this._board[move.to + 16];
            }
        }
        // if pawn promotion, replace with new piece
        if (move.promotion) {
            this._board[move.to] = { type: move.promotion, color: us };
        }
        // if we moved the king
        if (this._board[move.to].type === exports.KING) {
            this._kings[us] = move.to;
            // if we castled, move the rook next to the king
            if (move.flags & BITS.KSIDE_CASTLE) {
                const castlingTo = move.to - 1;
                const castlingFrom = move.to + 1;
                this._board[castlingTo] = this._board[castlingFrom];
                delete this._board[castlingFrom];
            }
            else if (move.flags & BITS.QSIDE_CASTLE) {
                const castlingTo = move.to + 1;
                const castlingFrom = move.to - 2;
                this._board[castlingTo] = this._board[castlingFrom];
                delete this._board[castlingFrom];
            }
            // turn off castling
            this._castling[us] = 0;
        }
        // turn off castling if we move a rook
        if (this._castling[us]) {
            for (let i = 0, len = ROOKS[us].length; i < len; i++) {
                if (move.from === ROOKS[us][i].square &&
                    this._castling[us] & ROOKS[us][i].flag) {
                    this._castling[us] ^= ROOKS[us][i].flag;
                    break;
                }
            }
        }
        // turn off castling if we capture a rook
        if (this._castling[them]) {
            for (let i = 0, len = ROOKS[them].length; i < len; i++) {
                if (move.to === ROOKS[them][i].square &&
                    this._castling[them] & ROOKS[them][i].flag) {
                    this._castling[them] ^= ROOKS[them][i].flag;
                    break;
                }
            }
        }
        // if big pawn move, update the en passant square
        if (move.flags & BITS.BIG_PAWN) {
            if (us === exports.BLACK) {
                this._epSquare = move.to - 16;
            }
            else {
                this._epSquare = move.to + 16;
            }
        }
        else {
            this._epSquare = EMPTY;
        }
        // reset the 50 move counter if a pawn is moved or a piece is captured
        if (move.piece === exports.PAWN) {
            this._halfMoves = 0;
        }
        else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
            this._halfMoves = 0;
        }
        else {
            this._halfMoves++;
        }
        if (us === exports.BLACK) {
            this._moveNumber++;
        }
        this._turn = them;
    }
    undo() {
        const move = this._undoMove();
        if (move) {
            const prettyMove = this._makePretty(move);
            this._decPositionCount(prettyMove.after);
            return prettyMove;
        }
        return null;
    }
    _undoMove() {
        const old = this._history.pop();
        if (old === undefined) {
            return null;
        }
        const move = old.move;
        this._kings = old.kings;
        this._turn = old.turn;
        this._castling = old.castling;
        this._epSquare = old.epSquare;
        this._halfMoves = old.halfMoves;
        this._moveNumber = old.moveNumber;
        const us = this._turn;
        const them = swapColor(us);
        this._board[move.from] = this._board[move.to];
        this._board[move.from].type = move.piece; // to undo any promotions
        delete this._board[move.to];
        if (move.captured) {
            if (move.flags & BITS.EP_CAPTURE) {
                // en passant capture
                let index;
                if (us === exports.BLACK) {
                    index = move.to - 16;
                }
                else {
                    index = move.to + 16;
                }
                this._board[index] = { type: exports.PAWN, color: them };
            }
            else {
                // regular capture
                this._board[move.to] = { type: move.captured, color: them };
            }
        }
        if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
            let castlingTo, castlingFrom;
            if (move.flags & BITS.KSIDE_CASTLE) {
                castlingTo = move.to + 1;
                castlingFrom = move.to - 1;
            }
            else {
                castlingTo = move.to - 2;
                castlingFrom = move.to + 1;
            }
            this._board[castlingTo] = this._board[castlingFrom];
            delete this._board[castlingFrom];
        }
        return move;
    }
    pgn({ newline = '\n', maxWidth = 0, } = {}) {
        /*
         * using the specification from http://www.chessclub.com/help/PGN-spec
         * example for html usage: .pgn({ max_width: 72, newline_char: "<br />" })
         */
        const result = [];
        let headerExists = false;
        /* add the PGN header information */
        for (const i in this._header) {
            /*
             * TODO: order of enumerated properties in header object is not
             * guaranteed, see ECMA-262 spec (section 12.6.4)
             */
            result.push('[' + i + ' "' + this._header[i] + '"]' + newline);
            headerExists = true;
        }
        if (headerExists && this._history.length) {
            result.push(newline);
        }
        const appendComment = (moveString) => {
            const comment = this._comments[this.fen()];
            if (typeof comment !== 'undefined') {
                const delimiter = moveString.length > 0 ? ' ' : '';
                moveString = `${moveString}${delimiter}{${comment}}`;
            }
            return moveString;
        };
        // pop all of history onto reversed_history
        const reversedHistory = [];
        while (this._history.length > 0) {
            reversedHistory.push(this._undoMove());
        }
        const moves = [];
        let moveString = '';
        // special case of a commented starting position with no moves
        if (reversedHistory.length === 0) {
            moves.push(appendComment(''));
        }
        // build the list of moves.  a move_string looks like: "3. e3 e6"
        while (reversedHistory.length > 0) {
            moveString = appendComment(moveString);
            const move = reversedHistory.pop();
            // make TypeScript stop complaining about move being undefined
            if (!move) {
                break;
            }
            // if the position started with black to move, start PGN with #. ...
            if (!this._history.length && move.color === 'b') {
                const prefix = `${this._moveNumber}. ...`;
                // is there a comment preceding the first move?
                moveString = moveString ? `${moveString} ${prefix}` : prefix;
            }
            else if (move.color === 'w') {
                // store the previous generated move_string if we have one
                if (moveString.length) {
                    moves.push(moveString);
                }
                moveString = this._moveNumber + '.';
            }
            moveString =
                moveString + ' ' + this._moveToSan(move, this._moves({ legal: true }));
            this._makeMove(move);
        }
        // are there any other leftover moves?
        if (moveString.length) {
            moves.push(appendComment(moveString));
        }
        // is there a result?
        if (typeof this._header.Result !== 'undefined') {
            moves.push(this._header.Result);
        }
        /*
         * history should be back to what it was before we started generating PGN,
         * so join together moves
         */
        if (maxWidth === 0) {
            return result.join('') + moves.join(' ');
        }
        // TODO (jah): huh?
        const strip = function () {
            if (result.length > 0 && result[result.length - 1] === ' ') {
                result.pop();
                return true;
            }
            return false;
        };
        // NB: this does not preserve comment whitespace.
        const wrapComment = function (width, move) {
            for (const token of move.split(' ')) {
                if (!token) {
                    continue;
                }
                if (width + token.length > maxWidth) {
                    while (strip()) {
                        width--;
                    }
                    result.push(newline);
                    width = 0;
                }
                result.push(token);
                width += token.length;
                result.push(' ');
                width++;
            }
            if (strip()) {
                width--;
            }
            return width;
        };
        // wrap the PGN output at max_width
        let currentWidth = 0;
        for (let i = 0; i < moves.length; i++) {
            if (currentWidth + moves[i].length > maxWidth) {
                if (moves[i].includes('{')) {
                    currentWidth = wrapComment(currentWidth, moves[i]);
                    continue;
                }
            }
            // if the current move will push past max_width
            if (currentWidth + moves[i].length > maxWidth && i !== 0) {
                // don't end the line with whitespace
                if (result[result.length - 1] === ' ') {
                    result.pop();
                }
                result.push(newline);
                currentWidth = 0;
            }
            else if (i !== 0) {
                result.push(' ');
                currentWidth++;
            }
            result.push(moves[i]);
            currentWidth += moves[i].length;
        }
        return result.join('');
    }
    header(...args) {
        for (let i = 0; i < args.length; i += 2) {
            if (typeof args[i] === 'string' && typeof args[i + 1] === 'string') {
                this._header[args[i]] = args[i + 1];
            }
        }
        return this._header;
    }
    loadPgn(pgn, { strict = false, newlineChar = '\r?\n', } = {}) {
        function mask(str) {
            return str.replace(/\\/g, '\\');
        }
        function parsePgnHeader(header) {
            const headerObj = {};
            const headers = header.split(new RegExp(mask(newlineChar)));
            let key = '';
            let value = '';
            for (let i = 0; i < headers.length; i++) {
                const regex = /^\s*\[\s*([A-Za-z]+)\s*"(.*)"\s*\]\s*$/;
                key = headers[i].replace(regex, '$1');
                value = headers[i].replace(regex, '$2');
                if (key.trim().length > 0) {
                    headerObj[key] = value;
                }
            }
            return headerObj;
        }
        // strip whitespace from head/tail of PGN block
        pgn = pgn.trim();
        /*
         * RegExp to split header. Takes advantage of the fact that header and movetext
         * will always have a blank line between them (ie, two newline_char's). Handles
         * case where movetext is empty by matching newlineChar until end of string is
         * matched - effectively trimming from the end extra newlineChar.
         *
         * With default newline_char, will equal:
         * /^(\[((?:\r?\n)|.)*\])((?:\s*\r?\n){2}|(?:\s*\r?\n)*$)/
         */
        const headerRegex = new RegExp('^(\\[((?:' +
            mask(newlineChar) +
            ')|.)*\\])' +
            '((?:\\s*' +
            mask(newlineChar) +
            '){2}|(?:\\s*' +
            mask(newlineChar) +
            ')*$)');
        // If no header given, begin with moves.
        const headerRegexResults = headerRegex.exec(pgn);
        const headerString = headerRegexResults
            ? headerRegexResults.length >= 2
                ? headerRegexResults[1]
                : ''
            : '';
        // Put the board in the starting position
        this.reset();
        // parse PGN header
        const headers = parsePgnHeader(headerString);
        let fen = '';
        for (const key in headers) {
            // check to see user is including fen (possibly with wrong tag case)
            if (key.toLowerCase() === 'fen') {
                fen = headers[key];
            }
            this.header(key, headers[key]);
        }
        /*
         * the permissive parser should attempt to load a fen tag, even if it's the
         * wrong case and doesn't include a corresponding [SetUp "1"] tag
         */
        if (!strict) {
            if (fen) {
                this.load(fen, { preserveHeaders: true });
            }
        }
        else {
            /*
             * strict parser - load the starting position indicated by [Setup '1']
             * and [FEN position]
             */
            if (headers['SetUp'] === '1') {
                if (!('FEN' in headers)) {
                    throw new Error('Invalid PGN: FEN tag must be supplied with SetUp tag');
                }
                // don't clear the headers when loading
                this.load(headers['FEN'], { preserveHeaders: true });
            }
        }
        /*
         * NB: the regexes below that delete move numbers, recursive annotations,
         * and numeric annotation glyphs may also match text in comments. To
         * prevent this, we transform comments by hex-encoding them in place and
         * decoding them again after the other tokens have been deleted.
         *
         * While the spec states that PGN files should be ASCII encoded, we use
         * {en,de}codeURIComponent here to support arbitrary UTF8 as a convenience
         * for modern users
         */
        function toHex(s) {
            return Array.from(s)
                .map(function (c) {
                /*
                 * encodeURI doesn't transform most ASCII characters, so we handle
                 * these ourselves
                 */
                return c.charCodeAt(0) < 128
                    ? c.charCodeAt(0).toString(16)
                    : encodeURIComponent(c).replace(/%/g, '').toLowerCase();
            })
                .join('');
        }
        function fromHex(s) {
            return s.length == 0
                ? ''
                : decodeURIComponent('%' + (s.match(/.{1,2}/g) || []).join('%'));
        }
        const encodeComment = function (s) {
            s = s.replace(new RegExp(mask(newlineChar), 'g'), ' ');
            return `{${toHex(s.slice(1, s.length - 1))}}`;
        };
        const decodeComment = function (s) {
            if (s.startsWith('{') && s.endsWith('}')) {
                return fromHex(s.slice(1, s.length - 1));
            }
        };
        // delete header to get the moves
        let ms = pgn
            .replace(headerString, '')
            .replace(
        // encode comments so they don't get deleted below
        new RegExp(`({[^}]*})+?|;([^${mask(newlineChar)}]*)`, 'g'), function (_match, bracket, semicolon) {
            return bracket !== undefined
                ? encodeComment(bracket)
                : ' ' + encodeComment(`{${semicolon.slice(1)}}`);
        })
            .replace(new RegExp(mask(newlineChar), 'g'), ' ');
        // delete recursive annotation variations
        const ravRegex = /(\([^()]+\))+?/g;
        while (ravRegex.test(ms)) {
            ms = ms.replace(ravRegex, '');
        }
        // delete move numbers
        ms = ms.replace(/\d+\.(\.\.)?/g, '');
        // delete ... indicating black to move
        ms = ms.replace(/\.\.\./g, '');
        /* delete numeric annotation glyphs */
        ms = ms.replace(/\$\d+/g, '');
        // trim and get array of moves
        let moves = ms.trim().split(new RegExp(/\s+/));
        // delete empty entries
        moves = moves.filter((move) => move !== '');
        let result = '';
        for (let halfMove = 0; halfMove < moves.length; halfMove++) {
            const comment = decodeComment(moves[halfMove]);
            if (comment !== undefined) {
                this._comments[this.fen()] = comment;
                continue;
            }
            const move = this._moveFromSan(moves[halfMove], strict);
            // invalid move
            if (move == null) {
                // was the move an end of game marker
                if (TERMINATION_MARKERS.indexOf(moves[halfMove]) > -1) {
                    result = moves[halfMove];
                }
                else {
                    throw new Error(`Invalid move in PGN: ${moves[halfMove]}`);
                }
            }
            else {
                // reset the end of game marker if making a valid move
                result = '';
                this._makeMove(move);
                this._incPositionCount(this.fen());
            }
        }
        /*
         * Per section 8.2.6 of the PGN spec, the Result tag pair must match match
         * the termination marker. Only do this when headers are present, but the
         * result tag is missing
         */
        if (result && Object.keys(this._header).length && !this._header['Result']) {
            this.header('Result', result);
        }
    }
    /*
     * Convert a move from 0x88 coordinates to Standard Algebraic Notation
     * (SAN)
     *
     * @param {boolean} strict Use the strict SAN parser. It will throw errors
     * on overly disambiguated moves (see below):
     *
     * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
     * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
     * 4. ... Ne7 is technically the valid SAN
     */
    _moveToSan(move, moves) {
        let output = '';
        if (move.flags & BITS.KSIDE_CASTLE) {
            output = 'O-O';
        }
        else if (move.flags & BITS.QSIDE_CASTLE) {
            output = 'O-O-O';
        }
        else {
            if (move.piece !== exports.PAWN) {
                const disambiguator = getDisambiguator(move, moves);
                output += move.piece.toUpperCase() + disambiguator;
            }
            if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
                if (move.piece === exports.PAWN) {
                    output += algebraic(move.from)[0];
                }
                output += 'x';
            }
            output += algebraic(move.to);
            if (move.promotion) {
                output += '=' + move.promotion.toUpperCase();
            }
        }
        this._makeMove(move);
        if (this.isCheck()) {
            if (this.isCheckmate()) {
                output += '#';
            }
            else {
                output += '+';
            }
        }
        this._undoMove();
        return output;
    }
    // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
    _moveFromSan(move, strict = false) {
        // strip off any move decorations: e.g Nf3+?! becomes Nf3
        const cleanMove = strippedSan(move);
        let pieceType = inferPieceType(cleanMove);
        let moves = this._moves({ legal: true, piece: pieceType });
        // strict parser
        for (let i = 0, len = moves.length; i < len; i++) {
            if (cleanMove === strippedSan(this._moveToSan(moves[i], moves))) {
                return moves[i];
            }
        }
        // the strict parser failed
        if (strict) {
            return null;
        }
        let piece = undefined;
        let matches = undefined;
        let from = undefined;
        let to = undefined;
        let promotion = undefined;
        /*
         * The default permissive (non-strict) parser allows the user to parse
         * non-standard chess notations. This parser is only run after the strict
         * Standard Algebraic Notation (SAN) parser has failed.
         *
         * When running the permissive parser, we'll run a regex to grab the piece, the
         * to/from square, and an optional promotion piece. This regex will
         * parse common non-standard notation like: Pe2-e4, Rc1c4, Qf3xf7,
         * f7f8q, b1c3
         *
         * NOTE: Some positions and moves may be ambiguous when using the permissive
         * parser. For example, in this position: 6k1/8/8/B7/8/8/8/BN4K1 w - - 0 1,
         * the move b1c3 may be interpreted as Nc3 or B1c3 (a disambiguated bishop
         * move). In these cases, the permissive parser will default to the most
         * basic interpretation (which is b1c3 parsing to Nc3).
         */
        let overlyDisambiguated = false;
        matches = cleanMove.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);
        if (matches) {
            piece = matches[1];
            from = matches[2];
            to = matches[3];
            promotion = matches[4];
            if (from.length == 1) {
                overlyDisambiguated = true;
            }
        }
        else {
            /*
             * The [a-h]?[1-8]? portion of the regex below handles moves that may be
             * overly disambiguated (e.g. Nge7 is unnecessary and non-standard when
             * there is one legal knight move to e7). In this case, the value of
             * 'from' variable will be a rank or file, not a square.
             */
            matches = cleanMove.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/);
            if (matches) {
                piece = matches[1];
                from = matches[2];
                to = matches[3];
                promotion = matches[4];
                if (from.length == 1) {
                    overlyDisambiguated = true;
                }
            }
        }
        pieceType = inferPieceType(cleanMove);
        moves = this._moves({
            legal: true,
            piece: piece ? piece : pieceType,
        });
        if (!to) {
            return null;
        }
        for (let i = 0, len = moves.length; i < len; i++) {
            if (!from) {
                // if there is no from square, it could be just 'x' missing from a capture
                if (cleanMove ===
                    strippedSan(this._moveToSan(moves[i], moves)).replace('x', '')) {
                    return moves[i];
                }
                // hand-compare move properties with the results from our permissive regex
            }
            else if ((!piece || piece.toLowerCase() == moves[i].piece) &&
                Ox88[from] == moves[i].from &&
                Ox88[to] == moves[i].to &&
                (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
                return moves[i];
            }
            else if (overlyDisambiguated) {
                /*
                 * SPECIAL CASE: we parsed a move string that may have an unneeded
                 * rank/file disambiguator (e.g. Nge7).  The 'from' variable will
                 */
                const square = algebraic(moves[i].from);
                if ((!piece || piece.toLowerCase() == moves[i].piece) &&
                    Ox88[to] == moves[i].to &&
                    (from == square[0] || from == square[1]) &&
                    (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
                    return moves[i];
                }
            }
        }
        return null;
    }
    ascii() {
        let s = '   +------------------------+\n';
        for (let i = Ox88.a8; i <= Ox88.h1; i++) {
            // display the rank
            if (file(i) === 0) {
                s += ' ' + '87654321'[rank(i)] + ' |';
            }
            if (this._board[i]) {
                const piece = this._board[i].type;
                const color = this._board[i].color;
                const symbol = color === exports.WHITE ? piece.toUpperCase() : piece.toLowerCase();
                s += ' ' + symbol + ' ';
            }
            else {
                s += ' . ';
            }
            if ((i + 1) & 0x88) {
                s += '|\n';
                i += 8;
            }
        }
        s += '   +------------------------+\n';
        s += '     a  b  c  d  e  f  g  h';
        return s;
    }
    perft(depth) {
        const moves = this._moves({ legal: false });
        let nodes = 0;
        const color = this._turn;
        for (let i = 0, len = moves.length; i < len; i++) {
            this._makeMove(moves[i]);
            if (!this._isKingAttacked(color)) {
                if (depth - 1 > 0) {
                    nodes += this.perft(depth - 1);
                }
                else {
                    nodes++;
                }
            }
            this._undoMove();
        }
        return nodes;
    }
    // pretty = external move object
    _makePretty(uglyMove) {
        const { color, piece, from, to, flags, captured, promotion } = uglyMove;
        let prettyFlags = '';
        for (const flag in BITS) {
            if (BITS[flag] & flags) {
                prettyFlags += FLAGS[flag];
            }
        }
        const fromAlgebraic = algebraic(from);
        const toAlgebraic = algebraic(to);
        const move = {
            color,
            piece,
            from: fromAlgebraic,
            to: toAlgebraic,
            san: this._moveToSan(uglyMove, this._moves({ legal: true })),
            flags: prettyFlags,
            lan: fromAlgebraic + toAlgebraic,
            before: this.fen(),
            after: '',
        };
        // generate the FEN for the 'after' key
        this._makeMove(uglyMove);
        move.after = this.fen();
        this._undoMove();
        if (captured) {
            move.captured = captured;
        }
        if (promotion) {
            move.promotion = promotion;
            move.lan += promotion;
        }
        return move;
    }
    turn() {
        return this._turn;
    }
    board() {
        const output = [];
        let row = [];
        for (let i = Ox88.a8; i <= Ox88.h1; i++) {
            if (this._board[i] == null) {
                row.push(null);
            }
            else {
                row.push({
                    square: algebraic(i),
                    type: this._board[i].type,
                    color: this._board[i].color,
                });
            }
            if ((i + 1) & 0x88) {
                output.push(row);
                row = [];
                i += 8;
            }
        }
        return output;
    }
    squareColor(square) {
        if (square in Ox88) {
            const sq = Ox88[square];
            return (rank(sq) + file(sq)) % 2 === 0 ? 'light' : 'dark';
        }
        return null;
    }
    history({ verbose = false } = {}) {
        const reversedHistory = [];
        const moveHistory = [];
        while (this._history.length > 0) {
            reversedHistory.push(this._undoMove());
        }
        while (true) {
            const move = reversedHistory.pop();
            if (!move) {
                break;
            }
            if (verbose) {
                moveHistory.push(this._makePretty(move));
            }
            else {
                moveHistory.push(this._moveToSan(move, this._moves()));
            }
            this._makeMove(move);
        }
        return moveHistory;
    }
    /*
     * Keeps track of position occurrence counts for the purpose of repetition
     * checking. All three methods (`_inc`, `_dec`, and `_get`) trim the
     * irrelevent information from the fen, initialising new positions, and
     * removing old positions from the record if their counts are reduced to 0.
     */
    _getPositionCount(fen) {
        const trimmedFen = trimFen(fen);
        return this._positionCount[trimmedFen] || 0;
    }
    _incPositionCount(fen) {
        const trimmedFen = trimFen(fen);
        if (this._positionCount[trimmedFen] === undefined) {
            this._positionCount[trimmedFen] = 0;
        }
        this._positionCount[trimmedFen] += 1;
    }
    _decPositionCount(fen) {
        const trimmedFen = trimFen(fen);
        if (this._positionCount[trimmedFen] === 1) {
            delete this._positionCount[trimmedFen];
        }
        else {
            this._positionCount[trimmedFen] -= 1;
        }
    }
    _pruneComments() {
        const reversedHistory = [];
        const currentComments = {};
        const copyComment = (fen) => {
            if (fen in this._comments) {
                currentComments[fen] = this._comments[fen];
            }
        };
        while (this._history.length > 0) {
            reversedHistory.push(this._undoMove());
        }
        copyComment(this.fen());
        while (true) {
            const move = reversedHistory.pop();
            if (!move) {
                break;
            }
            this._makeMove(move);
            copyComment(this.fen());
        }
        this._comments = currentComments;
    }
    getComment() {
        return this._comments[this.fen()];
    }
    setComment(comment) {
        this._comments[this.fen()] = comment.replace('{', '[').replace('}', ']');
    }
    deleteComment() {
        const comment = this._comments[this.fen()];
        delete this._comments[this.fen()];
        return comment;
    }
    getComments() {
        this._pruneComments();
        return Object.keys(this._comments).map((fen) => {
            return { fen: fen, comment: this._comments[fen] };
        });
    }
    deleteComments() {
        this._pruneComments();
        return Object.keys(this._comments).map((fen) => {
            const comment = this._comments[fen];
            delete this._comments[fen];
            return { fen: fen, comment: comment };
        });
    }
    setCastlingRights(color, rights) {
        for (const side of [exports.KING, exports.QUEEN]) {
            if (rights[side] !== undefined) {
                if (rights[side]) {
                    this._castling[color] |= SIDES[side];
                }
                else {
                    this._castling[color] &= ~SIDES[side];
                }
            }
        }
        this._updateCastlingRights();
        const result = this.getCastlingRights(color);
        return ((rights[exports.KING] === undefined || rights[exports.KING] === result[exports.KING]) &&
            (rights[exports.QUEEN] === undefined || rights[exports.QUEEN] === result[exports.QUEEN]));
    }
    getCastlingRights(color) {
        return {
            [exports.KING]: (this._castling[color] & SIDES[exports.KING]) !== 0,
            [exports.QUEEN]: (this._castling[color] & SIDES[exports.QUEEN]) !== 0,
        };
    }
    moveNumber() {
        return this._moveNumber;
    }
}
exports.Chess = Chess;
//# sourceMappingURL=chess.js.map
  root.Chess = exports.Chess;
  root.CHESS_SQUARES = exports.SQUARES;
  root.validateFen = exports.validateFen;
})(typeof window !== "undefined" ? window : globalThis);

;
/* ===== js/core-namespace.js ===== */
/* core-namespace.js — khong gian ten toan cuc + tien ich dung chung
 *
 * Moi file khac gan them thuoc tinh vao `CC`. Khong dung ES module vi ca du an
 * chay o che do sloppy va nap bang the <script> theo thu tu (giong sky-chicken).
 */

window.CC = window.CC || {};

CC.util = {
  /* --- truy van DOM --- */
  $: (sel, root) => (root || document).querySelector(sel),
  $$: (sel, root) => Array.from((root || document).querySelectorAll(sel)),

  /* Tao phan tu HTML. attrs ho tro class/text/html va moi thuoc tinh thuong. */
  el(tag, attrs, children) {
    const n = document.createElement(tag);
    CC.util._apply(n, attrs);
    CC.util._append(n, children);
    return n;
  },

  /* Tao phan tu SVG — bat buoc dung createElementNS, khong dung createElement. */
  svg(tag, attrs, children) {
    const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
    CC.util._apply(n, attrs);
    CC.util._append(n, children);
    return n;
  },

  _apply(n, attrs) {
    if (!attrs) return;
    for (const k in attrs) {
      const v = attrs[k];
      if (v === null || v === undefined || v === false) continue;
      if (k === 'text') n.textContent = v;
      else if (k === 'html') n.innerHTML = v;
      else if (k === 'class') n.setAttribute('class', v);
      else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
  },

  _append(n, children) {
    if (!children) return;
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c === null || c === undefined) return;
      n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
  },

  /* --- so hoc --- */
  clamp: (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v),
  randInt: (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1)),
  pick: arr => arr[Math.floor(Math.random() * arr.length)],

  /* Chon ngau nhien theo trong so. weights cung do dai voi items. */
  pickWeighted(items, weights) {
    let total = 0;
    for (let i = 0; i < weights.length; i++) total += weights[i];
    if (total <= 0) return items[0];
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
      r -= weights[i];
      if (r <= 0) return items[i];
    }
    return items[items.length - 1];
  },

  /* --- thoi gian --- */
  sleep: ms => new Promise(r => setTimeout(r, ms)),

  /* Dinh dang giay thanh m:ss */
  mmss(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + String(s).padStart(2, '0');
  },

  /* Chan chu nguoi dung nhap truoc khi do vao innerHTML */
  escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },

  /* --- su kien don gian, dung de noi cac he thong voi nhau --- */
  bus: (() => {
    const map = {};
    return {
      on(evt, fn) { (map[evt] = map[evt] || []).push(fn); return () => CC.util.bus.off(evt, fn); },
      off(evt, fn) { if (map[evt]) map[evt] = map[evt].filter(f => f !== fn); },
      emit(evt, data) {
        if (!map[evt]) return;
        // Sao chep mang truoc khi duyet: handler co the tu go chinh no ra
        map[evt].slice().forEach(fn => {
          try { fn(data); } catch (e) { console.error('[bus] loi o handler "' + evt + '":', e); }
        });
      }
    };
  })()
};

;
/* ===== js/core-config.js ===== */
﻿/* core-config.js — hang so toan cuc
 *
 * Ten meo dat o DUY NHAT mot cho. Bank cau thoai chen qua khuon mau {cat},
 * de sau nay doi ten khong phai sua hang tram cau.
 */

CC.cfg = {
  /* --- nhan vat ---
   * Gia tri nay chi la DU PHONG. data-cat-profiles.js thay no bang mot thuoc tinh
   * dong tra ve ten con meo dang doi dau (moi muc Elo la mot nhan vat khac).
   * Giu lai de game khong vo neu file ho so chua kip nap.
   */
  CAT_NAME: 'Lèo',

  /* --- hinh hoc ban co ---
   * SVG dung he toa do rieng: moi o vuong 100 don vi, ban co 800x800.
   * Kich thuoc thuc te do CSS quyet dinh, nen doi giao dien khong dung toi day.
   */
  SQ: 100,
  BOARD: 800,

  /* --- thoi gian (ms) --- */
  MOVE_ANIM: 180,        // quan truot tu o cu sang o moi
  MOOD_MIN: 800,         // bieu cam meo giu it nhat bao lau truoc khi doi
  MOOD_DEFAULT: 2200,    // bieu cam manh tu ve binh thuong sau bao lau
  BUBBLE_HIDE: 6000,     // bong bong thoai tu an
  THINK_MIN: 400,        // do tre gia toi thieu cua meo
  THINK_MAX: 1800,       // do tre gia toi da
  IDLE_SLEEPY: 30000,    // nguoi choi nghi lau bao nhieu thi meo buon ngu

  /* --- luat choi --- */
  MAX_HINTS: 3,          // so lan goi y moi van

  /* Duong dan file engine, tinh tu trang dang mo.
   * De cau hinh duoc vi cong cu hieu chinh (tools/selfplay-harness.html) nam sau
   * mot cap thu muc nen phai tro nguoc ra.
   */
  ENGINE_PATH: 'vendor/stockfish/stockfish-nnue-16-single.js',

  /* --- khoa localStorage ---
   * Tien to rieng de khong dam voi game khac tren cung ten mien portal.
   */
  LS: {
    GAME: 'catchess.game',        // van dang choi
    PREFS: 'catchess.prefs',      // tuy chon nguoi choi
    RECORD: 'catchess.record',    // thang/thua/hoa theo tung muc
    SCORE: 'catchess.score'       // diem tich luy cho bang xep hang
  },

  /* --- mau quan co ---
   * De o day thay vi CSS vi quan co ve bang SVG path, can mau luc dung hinh.
   *
   * Moi ben co 4 mau: than / bong / bat sang / vien. Ba lop thay vi mot lam quan
   * co khoi, nhin ro hinh hon han tren o co nho ~44px cua dien thoai.
   */
  PIECE: {
    w: { fill: '#f8f3e9', shade: '#dccfb6', light: '#fffefb', stroke: '#2b2118' },
    b: { fill: '#3d332a', shade: '#271f19', light: '#5c4d3e', stroke: '#100e0b' }
  }
};

/* Tien ich chen ten meo vao cau thoai: "{cat} an quan roi" -> "Lèo an quan roi" */
CC.cfg.fmt = function (tpl, vars) {
  const all = Object.assign({ cat: CC.cfg.CAT_NAME }, vars || {});
  return String(tpl).replace(/\{(\w+)\}/g, (m, k) => (k in all ? all[k] : m));
};

;
/* ===== js/data-cat-profiles.js ===== */
/* data-cat-profiles.js — tam con meo, moi con mot tinh cach
 *
 * Truoc day ca bay muc dung CHUNG mot con meo ten Leo, chi khac giong noi theo ba
 * tang. Nguoi choi leo muc khong thay gi moi ngoai con so Elo.
 *
 * Gio moi muc la MOT NHAN VAT: ten rieng, mau long rieng, net rieng tren mat, va
 * cau thoai rieng o nhung khoanh khac de nho nhat.
 *
 * VI SAO KHONG VIET HAN BAY BANK CAU THOAI RIENG:
 * Tam bank day du la ~1.500 dong lap lai gan het noi dung — vua phinh goi, vua kho
 * sua (doi mot cau phai sua bay cho). Cach lam o day:
 *   - `voice`  chon mot trong ba bank NEN da co (kitten / adult / master)
 *   - `lines`  ghi de rieng o nam su kien dinh hinh tinh cach nhat
 * Bank nen lo phan chung, phan ghi de lo phan ca tinh. DRY ma van ra tam nhan vat.
 *
 * Ten meo deu la ten meo Viet quen thuoc — nghe la biet ngay la meo nha.
 */

CC.CatProfiles = (function () {
  const LIST = [
    {
      elo: 400, id: 'trang', name: 'Trắng',
      tag: 'Mèo sơ sinh · chưa biết gì',
      about: 'Mới mở mắt, luật còn chưa thuộc. Hỏi lại nhiều hơn là đi cờ.',
      voice: 'kitten',
      fur: '#f5ead6', furDark: '#e0d0b4', belly: '#fffdf7', pink: '#f6a8b8', ink: '#5a4632',
      mark: 'bib'
    },
    {
      elo: 500, id: 'leo', name: 'Lèo',
      tag: 'Mèo con · nghịch ngợm',
      about: 'Hiếu động, hay khoe, thắng một ván là nhớ cả tuần.',
      voice: 'kitten',
      fur: '#f0a860', furDark: '#d98b3f', belly: '#fce8cf', pink: '#f08fa0', ink: '#4a3520',
      mark: 'none'
    },
    {
      elo: 700, id: 'muc', name: 'Mực',
      tag: 'Mèo tập chơi · nhút nhát',
      about: 'Ít nói, hay nép. Đánh cẩn thận vì sợ sai hơn là vì biết.',
      voice: 'kitten',
      fur: '#4a4a52', furDark: '#33333a', belly: '#e8e8ee', pink: '#e59aa8', ink: '#1c1c22',
      mark: 'chest-spot'
    },
    {
      elo: 900, id: 'vang', name: 'Vàng',
      tag: 'Mèo hàng xóm · xởi lởi',
      about: 'Nhiều chuyện, thích ăn, đánh cờ mà cứ nghĩ tới bữa tối.',
      voice: 'adult',
      fur: '#e8b93f', furDark: '#c9992a', belly: '#fdf1cf', pink: '#f09aa8', ink: '#4a3a14',
      mark: 'scarf'
    },
    {
      elo: 1050, id: 'tamthe', name: 'Tam Thể',
      tag: 'Mèo tinh ranh · đanh đá',
      about: 'Khịa nhẹ mỗi khi Anh đi hớ. Không ác, chỉ là thích chọc.',
      voice: 'adult',
      fur: '#f2e3d0', furDark: '#c8703a', belly: '#fffaf2', pink: '#f08fa0', ink: '#3d2a1c',
      mark: 'calico'
    },
    {
      elo: 1250, id: 'but', name: 'Bụt',
      tag: 'Mèo lão luyện · điềm đạm',
      about: 'Nói như ông cụ non. Thua cũng cười, thắng cũng cười.',
      voice: 'master',
      fur: '#9aa2a8', furDark: '#7b848b', belly: '#e6ebee', pink: '#e8a2ae', ink: '#2e343a',
      mark: 'glasses'
    },
    {
      elo: 1400, id: 'bao', name: 'Báo',
      tag: 'Mèo đi săn · nhanh và sắc',
      about: 'Ép sát ngay từ nước đầu. Chậm một nhịp là mất quân.',
      voice: 'master',
      fur: '#cf9350', furDark: '#a9713a', belly: '#f6e3c6', pink: '#ef94a4', ink: '#3a2716',
      mark: 'rosette'
    },
    {
      elo: 1600, id: 'daika', name: 'Đại Ka',
      tag: 'Mèo đại sư · lạnh lùng',
      about: 'Nói cực ngắn. Mỗi câu như đã tính trước mười nước.',
      voice: 'master',
      fur: '#5c5348', furDark: '#3f3830', belly: '#c9c0b2', pink: '#d9909e', ink: '#181410',
      mark: 'scar'
    }
  ];

  const byId = {};
  LIST.forEach(p => { byId[p.id] = p; });

  const api = {
    LIST,
    byId: id => byId[id] || LIST[0],

    /* Muc gan nhat voi mot con so Elo bat ky */
    byElo(elo) {
      let best = LIST[0], d = Infinity;
      LIST.forEach(p => {
        const dist = Math.abs(p.elo - elo);
        if (dist < d) { d = dist; best = p; }
      });
      return best;
    },

    /* Con meo dang doi dau. O man menu thi lay theo muc dang chon. */
    current() {
      const elo = (CC.Game && CC.Game.state && CC.Game.state.elo) || CC.Store.prefs().elo;
      return api.byElo(elo);
    }
  };

  /* CC.cfg.CAT_NAME tro thanh thuoc tinh DONG.
   *
   * Nho vay 13 cho dang dung `CC.cfg.CAT_NAME` khong phai sua mot dong nao — chung
   * tu tra ve ten con meo dang doi dau. Doi mot cho, khong phai doi khap noi.
   */
  Object.defineProperty(CC.cfg, 'CAT_NAME', {
    get() { return api.current().name; },
    configurable: true
  });

  return api;
})();

;
/* ===== js/rules-adapter.js ===== */
/* rules-adapter.js — lop boc quanh chess.js
 *
 * NGUYEN TAC: chi DUY NHAT file nay biet chess.js ton tai. Phan con lai cua game
 * chi lam viec voi FEN, nuoc di dang UCI ("e2e4", "e7e8q") va cac object don gian.
 * Doi thu vien luat sau nay = sua moi file nay.
 */

CC.Rules = (function () {
  let g = null;

  /* Doi nuoc di cua chess.js sang chuoi UCI ma Stockfish hieu */
  const toUci = m => m.from + m.to + (m.promotion || '');

  const api = {
    /* --- vong doi --- */
    newGame(fen) {
      g = fen ? new Chess(fen) : new Chess();
      return api;
    },

    /* Nap lai tu FEN. Tra ve false neu FEN hong (khong nem loi ra ngoai). */
    load(fen) {
      try { g = new Chess(fen); return true; }
      catch (e) { console.warn('[rules] FEN hong:', fen, e.message); return false; }
    },

    /* Nap lai tu danh sach nuoc di — giu duoc lich su de con di lai duoc.
     * Dung khi khoi phuc van da luu: load(fen) mat lich su, replay thi khong.
     */
    loadHistory(moves) {
      g = new Chess();
      for (const uci of moves) {
        if (!api.move(uci)) {
          console.warn('[rules] nuoc di luu bi hong:', uci);
          return false;
        }
      }
      return true;
    },

    /* --- doc trang thai --- */
    fen: () => g.fen(),
    turn: () => g.turn(),                    // 'w' | 'b'
    moveNumber: () => g.moveNumber(),
    inCheck: () => g.inCheck(),
    ascii: () => g.ascii(),

    /* Danh sach quan tren ban, dang phang: [{square,type,color}, ...] */
    pieces() {
      const out = [];
      g.board().forEach(row => row.forEach(sq => { if (sq) out.push(sq); }));
      return out;
    },

    /* O dang dung vua cua mot ben — dung de to do khi bi chieu */
    kingSquare(color) {
      const k = api.pieces().find(p => p.type === 'k' && p.color === color);
      return k ? k.square : null;
    },

    /* --- nuoc di --- */

    /* Cac nuoc hop le xuat phat tu mot o. Tra ve [{from,to,promotion,san,flags,captured}] */
    movesFrom(square) {
      return g.moves({ square, verbose: true });
    },

    /* Toan bo nuoc hop le, dang UCI */
    allUci() {
      return g.moves({ verbose: true }).map(toUci);
    },

    /* Di mot nuoc. Nhan chuoi UCI hoac {from,to,promotion}.
     * Tra ve object nuoc di neu hop le, null neu khong.
     */
    move(mv) {
      const req = typeof mv === 'string'
        ? { from: mv.slice(0, 2), to: mv.slice(2, 4), promotion: mv.slice(4) || undefined }
        : mv;
      try {
        const res = g.move(req);
        if (res) res.uci = toUci(res);
        return res;
      } catch (e) {
        // chess.js v1 nem loi khi nuoc khong hop le thay vi tra null
        return null;
      }
    },

    undo() {
      const m = g.undo();
      if (m) m.uci = toUci(m);
      return m;
    },

    /* Nuoc di co phai phong cap khong — de biet luc nao hien hop chon quan */
    isPromotion(from, to) {
      return api.movesFrom(from).some(m => m.to === to && m.flags.includes('p'));
    },

    /* Lich su dang UCI, dung de luu van */
    historyUci() {
      return g.history({ verbose: true }).map(toUci);
    },

    /* Lich su day du, dung de hien bang nuoc di va cho he thong chat doc */
    historyVerbose() {
      return g.history({ verbose: true });
    },

    /* Anh chup the co sau `ply` nuoc dau tien cua mot danh sach nuoc di.
     *
     * Dung cho tinh nang XEM LAI: nguoi choi lat ve nuoc truoc de coi lai, ma van
     * co dang choi KHONG duoc dung toi. Vi vay ham nay dung mot ban co rieng, doc
     * xong bo di — khong he cham vao `g`.
     */
    snapshotAt(moves, ply) {
      const t = new Chess();
      let last = null;
      const n = Math.max(0, Math.min(ply, moves.length));
      for (let i = 0; i < n; i++) {
        const u = moves[i];
        try {
          last = t.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u.slice(4) || undefined });
        } catch (e) { break; }
      }

      const pieces = [];
      t.board().forEach(row => row.forEach(sq => { if (sq) pieces.push(sq); }));

      const inCheck = t.inCheck();
      const k = inCheck ? pieces.find(p => p.type === 'k' && p.color === t.turn()) : null;

      return {
        pieces,
        last: last ? { from: last.from, to: last.to, san: last.san } : null,
        turn: t.turn(),
        inCheck,
        checkSquare: k ? k.square : null
      };
    },

    /* --- ket thuc van --- */

    /* Tra ve {over, winner, kind, label}
     * winner: 'w' | 'b' | null (hoa)
     */
    result() {
      if (!g.isGameOver()) return { over: false };
      if (g.isCheckmate()) {
        const winner = g.turn() === 'w' ? 'b' : 'w';   // ben vua di la ben thang
        return { over: true, winner, kind: 'checkmate', label: 'Chiếu hết' };
      }
      if (g.isStalemate()) return { over: true, winner: null, kind: 'stalemate', label: 'Hết nước đi (pat)' };
      if (g.isInsufficientMaterial()) return { over: true, winner: null, kind: 'material', label: 'Không đủ quân chiếu hết' };
      if (g.isThreefoldRepetition()) return { over: true, winner: null, kind: 'threefold', label: 'Lặp nước 3 lần' };
      return { over: true, winner: null, kind: 'fifty', label: 'Luật 50 nước' };
    },

    /* --- tinh vat chat ---
     * Dung de biet ai dang hon quan, cho phan bieu cam meo va he thong chat.
     */
    VALUE: { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 },

    /* Chenh lech quan, duong nghia la Trang dang hon */
    materialDiff() {
      let d = 0;
      api.pieces().forEach(p => {
        d += (p.color === 'w' ? 1 : -1) * api.VALUE[p.type];
      });
      return d;
    },

    /* --- ban nhap ---
     * Phan tich mot the co BAT KY ma khong dung toi van dang choi.
     * Dung cho cac chot chan an toan (engine-safety-guards.js) va he thong goi y.
     *
     * Van giu nguyen tac "chi file nay biet chess.js": ben ngoai chi thay object
     * co san may ham can dung.
     */
    scratch(fen) {
      const s = new Chess(fen);
      const me = s.turn();
      const foe = me === 'w' ? 'b' : 'w';

      return {
        turn: me,
        foe,
        inCheck: () => s.inCheck(),
        movesUci: () => s.moves({ verbose: true }).map(toUci),
        movesVerbose: () => s.moves({ verbose: true }),

        /* Thu mot nuoc roi doc ket qua, sau do LUI LAI ngay.
         * Tra {ok, checkmate, stalemate, threefold, check, attacked}
         *   attacked = o dich co bi doi phuong an lai duoc khong
         */
        probe(uci) {
          let m;
          try {
            m = s.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci.slice(4) || undefined });
          } catch (e) { return { ok: false }; }
          if (!m) return { ok: false };

          const out = {
            ok: true,
            checkmate: s.isCheckmate(),
            stalemate: s.isStalemate(),
            threefold: s.isThreefoldRepetition(),
            check: s.inCheck(),
            captured: m.captured || null,
            piece: m.piece,
            // Sau khi ta di, den luot doi phuong -> hoi xem chung co an lai duoc o do khong
            attacked: s.isAttacked(m.to, foe)
          };
          s.undo();
          return out;
        },

        /* Chenh lech quan theo goc nhin BEN DANG DI (duong = dang hon) */
        materialForSideToMove() {
          let d = 0;
          s.board().forEach(row => row.forEach(p => {
            if (p) d += (p.color === me ? 1 : -1) * api.VALUE[p.type];
          }));
          return d;
        }
      };
    },

    /* Quan da bi an cua moi ben, suy ra tu the co hien tai.
     * Tra ve {w:[type...], b:[type...]} — w la quan TRANG da mat.
     */
    captured() {
      const full = { p: 8, n: 2, b: 2, r: 2, q: 1, k: 1 };
      const left = { w: {}, b: {} };
      api.pieces().forEach(p => { left[p.color][p.type] = (left[p.color][p.type] || 0) + 1; });
      const out = { w: [], b: [] };
      ['w', 'b'].forEach(c => {
        for (const t in full) {
          const missing = full[t] - (left[c][t] || 0);
          for (let i = 0; i < missing; i++) out[c].push(t);
        }
      });
      return out;
    }
  };

  return api;
})();

;
/* ===== js/storage-local.js ===== */
/* storage-local.js — luu tru cuc bo
 *
 * localStorage la GOC. Dam may (phase 08) chi la ban sao luu — mat mang van choi
 * duoc binh thuong. Moi thao tac boc try/catch vi localStorage co the bi tat
 * (che do rieng tu tren iOS Safari nem loi thay vi tra null).
 */

CC.Store = (function () {
  const LS = CC.cfg.LS;

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.warn('[store] doc that bai:', key, e.message);
      return fallback;
    }
  }

  function write(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
      return true;
    } catch (e) {
      console.warn('[store] ghi that bai:', key, e.message);
      return false;
    }
  }

  const DEFAULT_PREFS = {
    elo: 700,            // muc da chon lan truoc
    chatOn: true,
    autoFlip: true,      // che do 2 nguoi: tu lat ban theo luot
    dark: null,          // null = theo he thong
    sound: true,         // tieng dong (dat quan, an quan, chieu)
    bgm: false,          // nhac nen — MAC DINH TAT, xem ghi chu duoi
    fx: true             // hieu ung hinh anh
  };

  /* Vi sao nhac nen mac dinh TAT: nguoi choi mo game lan dau ma bi phat nhac ngay
   * la phan xa dau tien di tim nut tat. Tieng dong thi giu bat vi no gan lien voi
   * hanh dong (dat quan xuong co tieng go) — thieu no game thay nhu hong. */

  const api = {
    /* --- tuy chon --- */
    prefs() {
      return Object.assign({}, DEFAULT_PREFS, read(LS.PREFS, {}));
    },
    setPref(key, val) {
      const p = api.prefs();
      p[key] = val;
      write(LS.PREFS, p);
      CC.util.bus.emit('prefs:changed', { key, val, prefs: p });
      return p;
    },

    /* --- van dang choi ---
     * Luu danh sach nuoc di chu khong chi FEN: giu duoc lich su de di lai duoc,
     * va de he thong chat doc lai dien bien khi khoi phuc.
     */
    saveGame(state) {
      return write(LS.GAME, state);
    },
    loadGame() {
      return read(LS.GAME, null);
    },
    clearGame() {
      try { localStorage.removeItem(LS.GAME); } catch (e) { /* khong sao */ }
    },

    /* --- thanh tich theo tung muc Elo ---
     * Dang: { "700": {w:3, l:1, d:0}, ... }
     */
    record() {
      return read(LS.RECORD, {});
    },
    addResult(elo, outcome) {
      const rec = api.record();
      const key = String(elo);
      const r = rec[key] || { w: 0, l: 0, d: 0 };
      if (outcome === 'win') r.w++;
      else if (outcome === 'loss') r.l++;
      else r.d++;
      rec[key] = r;
      write(LS.RECORD, rec);
      return rec;
    },

    /* --- diem tich luy cho bang xep hang (phase 08) --- */
    score() {
      return read(LS.SCORE, { bestEloBeaten: 0, catPoints: 0, bestStreak: 0, streak: 0, totalGames: 0 });
    },
    setScore(s) {
      write(LS.SCORE, s);
      return s;
    }
  };

  return api;
})();

;
/* ===== js/audio-engine.js ===== */
/* audio-engine.js — nen tang am thanh
 *
 * VI SAO TONG HOP BANG WebAudio THAY VI DUNG FILE AM THANH:
 *
 * Da kiem chung Kenney (kenney.nl) — asset cua ho la CC0, dung thoai mai, va co
 * san goi "Interface Sounds" 100 tieng. Van khong dung, vi ba ly do cu the:
 *
 *   1. Game BAT BUOC chay offline, nghia la moi file phai nam trong precache cua
 *      service worker. Goi hien tai 883 KB, trong do Stockfish da chiem 561 KB.
 *      Them nhac nen dang file la +1..4 MB — gap may lan ca game.
 *   2. Am thanh co vua toan la tieng go ngan (dat quan, an quan, chieu). Day dung
 *      la thu WebAudio tong hop tot nhat, ton 0 KB.
 *   3. Khong phai sua build.mjs, khong phai lo danh sach precache, khong rang buoc
 *      giay phep nao.
 *
 * Neu sau nay muon tieng THU AM THAT: giu nguyen giao dien CC.Sfx.play(ten), chi
 * doi phan ben trong sang nap file. Phan con lai cua game khong phai sua gi.
 *
 * TU DONG PHAT BI CHAN: trinh duyet khong cho tao tieng truoc khi nguoi dung cham
 * vao trang. Nen AudioContext chi duoc tao o lan tuong tac dau tien.
 */

CC.Audio = (function () {
  let ctx = null;
  let master = null;
  let sfxGain = null;
  let bgmGain = null;
  let unlocked = false;

  function build() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();

    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);

    sfxGain = ctx.createGain();
    sfxGain.gain.value = 0.85;
    sfxGain.connect(master);

    // Nhac nen phai NHO hon nhieu so voi tieng dong, neu khong no lan at
    bgmGain = ctx.createGain();
    bgmGain.gain.value = 0.0;
    bgmGain.connect(master);

    return true;
  }

  const api = {
    /* Goi o lan cham dau tien. An toan khi goi nhieu lan. */
    unlock() {
      if (unlocked) return true;
      if (!ctx && !build()) return false;
      if (ctx.state === 'suspended') ctx.resume();
      unlocked = true;
      CC.util.bus.emit('audio:ready', {});
      return true;
    },

    ready: () => unlocked && ctx && ctx.state === 'running',
    ctx: () => ctx,
    sfxOut: () => sfxGain,
    bgmOut: () => bgmGain,
    now: () => (ctx ? ctx.currentTime : 0),

    /* --- am luong --- */
    setSfxVolume(v) { if (sfxGain) sfxGain.gain.value = CC.util.clamp(v, 0, 1); },

    /* Nhac nen len/xuong tu tu — cat dot ngot nghe rat chuoi */
    fadeBgm(target, seconds) {
      if (!bgmGain || !ctx) return;
      const t = ctx.currentTime;
      bgmGain.gain.cancelScheduledValues(t);
      bgmGain.gain.setValueAtTime(bgmGain.gain.value, t);
      bgmGain.gain.linearRampToValueAtTime(CC.util.clamp(target, 0, 1), t + (seconds || 1.2));
    },

    init() {
      // Bat khoa o tuong tac dau tien, bat ke la cham hay bam phim
      const kick = () => {
        api.unlock();
        ['pointerdown', 'keydown'].forEach(e => document.removeEventListener(e, kick));
      };
      ['pointerdown', 'keydown'].forEach(e => document.addEventListener(e, kick, { once: false }));

      // Tab an thi dung han tieng — khong ai muon game keu khi dang lam viec khac
      document.addEventListener('visibilitychange', () => {
        if (!ctx) return;
        if (document.hidden) ctx.suspend();
        else if (unlocked && CC.Store.prefs().sound) ctx.resume();
      });

      return api;
    }
  };

  return api;
})();

;
/* ===== js/audio-sfx.js ===== */
/* audio-sfx.js — tieng dong, tong hop bang WebAudio (0 KB file)
 *
 * Nguyen ly chung cua moi tieng o day: mot dao dong (hoac nhieu) + mot duong bao
 * am luong tat nhanh. Tieng go go = dao dong hinh sin tan so thap tat trong ~80ms.
 * Nghe rat giong quan co dat xuong ban that.
 *
 * Moi tieng deu NGAN (< 400ms) tru tieng ket thuc van. Am thanh dai trong game co
 * vua rat mau chan vi nguoi choi nghe no hang tram lan mot van.
 */

CC.Sfx = (function () {
  /* Mot not don: song + duong bao. Day la vien gach cua moi tieng ben duoi. */
  function tone(o) {
    const ctx = CC.Audio.ctx();
    if (!ctx) return;
    const t0 = ctx.currentTime + (o.delay || 0);

    const osc = ctx.createOscillator();
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(o.freq, t0);
    if (o.freqTo) osc.frequency.exponentialRampToValueAtTime(Math.max(o.freqTo, 1), t0 + o.dur);

    const g = ctx.createGain();
    // Vao nhanh (5ms) roi tat dan — dac trung cua tieng go
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(o.vol || 0.3, t0 + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + o.dur);

    let node = osc;
    if (o.filter) {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = o.filter;
      osc.connect(f); node = f;
    }
    node.connect(g);
    g.connect(CC.Audio.sfxOut());

    osc.start(t0);
    osc.stop(t0 + o.dur + 0.02);
  }

  /* Tieng nhieu ngan — dung lam phan "cham" cua tieng go va tieng an quan */
  function noise(o) {
    const ctx = CC.Audio.ctx();
    if (!ctx) return;
    const t0 = ctx.currentTime + (o.delay || 0);
    const len = Math.floor(ctx.sampleRate * o.dur);

    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      // Nhieu trang tat dan theo ham mu
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5);
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const f = ctx.createBiquadFilter();
    f.type = o.hp ? 'highpass' : 'lowpass';
    f.frequency.value = o.filter || 1200;

    const g = ctx.createGain();
    g.gain.value = o.vol || 0.2;

    src.connect(f); f.connect(g); g.connect(CC.Audio.sfxOut());
    src.start(t0);
  }

  /* --- bang tieng --- */
  const SOUNDS = {
    /* Dat quan xuong ban — tieng go go chac, kho */
    move() {
      tone({ freq: 190, freqTo: 90, dur: 0.09, vol: 0.30, type: 'sine', filter: 900 });
      noise({ dur: 0.05, vol: 0.11, filter: 2200 });
    },

    /* An quan — nang hon, co tieng va cham cua hai quan */
    capture() {
      tone({ freq: 150, freqTo: 62, dur: 0.15, vol: 0.38, type: 'triangle', filter: 800 });
      noise({ dur: 0.11, vol: 0.24, filter: 1500 });
      tone({ freq: 95, freqTo: 55, dur: 0.19, vol: 0.20, type: 'sine', delay: 0.02 });
    },

    /* Chieu tuong — hai not di len, du de giat minh ma khong chua tai */
    check() {
      tone({ freq: 620, dur: 0.11, vol: 0.24, type: 'square', filter: 2200 });
      tone({ freq: 830, dur: 0.16, vol: 0.22, type: 'square', filter: 2400, delay: 0.09 });
    },

    /* Nhap thanh — hai tieng go lien tiep (Vua roi Xe) */
    castle() {
      tone({ freq: 200, freqTo: 100, dur: 0.08, vol: 0.26, type: 'sine', filter: 900 });
      tone({ freq: 200, freqTo: 100, dur: 0.08, vol: 0.26, type: 'sine', filter: 900, delay: 0.13 });
    },

    /* Phong cap — chuoi not di len, cam giac "thang cap" */
    promote() {
      [523, 659, 784, 1047].forEach((f, i) => {
        tone({ freq: f, dur: 0.22, vol: 0.20, type: 'triangle', delay: i * 0.07 });
      });
    },

    /* Nguoi choi chon quan — rat khe, chi de biet la da cham trung */
    select() {
      tone({ freq: 440, dur: 0.04, vol: 0.10, type: 'sine' });
    },

    /* Nuoc khong hop le / bam nham */
    deny() {
      tone({ freq: 150, freqTo: 110, dur: 0.13, vol: 0.20, type: 'sawtooth', filter: 600 });
    },

    /* Thang van — tieng meo vui, quang do di len */
    win() {
      [523, 659, 784, 1047, 1319].forEach((f, i) => {
        tone({ freq: f, dur: 0.42, vol: 0.20, type: 'triangle', delay: i * 0.1 });
      });
    },

    /* Thua van — quang do di xuong */
    lose() {
      [523, 466, 392, 311].forEach((f, i) => {
        tone({ freq: f, dur: 0.5, vol: 0.19, type: 'sine', delay: i * 0.14 });
      });
    },

    /* Hoa — hai not bang nhau, khong len khong xuong */
    draw() {
      tone({ freq: 440, dur: 0.4, vol: 0.18, type: 'sine' });
      tone({ freq: 587, dur: 0.5, vol: 0.16, type: 'sine', delay: 0.16 });
    },

    /* Meo noi — mot tieng "meo" nho bang hai not truot */
    meow() {
      tone({ freq: 700, freqTo: 480, dur: 0.18, vol: 0.13, type: 'triangle', filter: 2000 });
    }
  };

  return {
    /* Phat mot tieng theo ten. Tat tieng hoac chua mo khoa thi im lang. */
    play(name) {
      if (!CC.Store.prefs().sound) return;
      if (!CC.Audio.ready()) return;
      const fn = SOUNDS[name];
      if (fn) { try { fn(); } catch (e) { /* am thanh hong khong duoc lam vo game */ } }
    },

    names: () => Object.keys(SOUNDS),

    /* Noi tieng dong vao dien bien van co */
    init() {
      const B = CC.util.bus;

      B.on('game:move', ({ move }) => {
        if (move.flags.includes('k') || move.flags.includes('q')) CC.Sfx.play('castle');
        else if (move.promotion) CC.Sfx.play('promote');
        else if (move.captured) CC.Sfx.play('capture');
        else CC.Sfx.play('move');

        // Chieu keu them mot tieng rieng, cham hon mot nhip cho khong chong len
        if (CC.Rules.inCheck()) setTimeout(() => CC.Sfx.play('check'), 130);
      });

      B.on('game:over', ({ outcome, mode }) => {
        setTimeout(() => {
          if (mode === 'hotseat') CC.Sfx.play('draw');
          else CC.Sfx.play(outcome === 'win' ? 'win' : outcome === 'loss' ? 'lose' : 'draw');
        }, 220);
      });

      B.on('chat:say', ({ from }) => { if (from === 'cat') CC.Sfx.play('meow'); });

      return this;
    }
  };
})();

;
/* ===== js/audio-bgm.js ===== */
/* audio-bgm.js — nhac nen sinh tai cho, khong dung file nhac
 *
 * VI SAO SINH TAI CHO: mot file nhac loop chat luong nghe duoc la 1-4 MB. Game
 * hien tai ca goi moi 883 KB va phai precache het de choi offline. Khong dang.
 *
 * CACH LAM: mot vong hop am 4 nhip, moi nhip rai vai not theo THANG NGU AM (pentatonic).
 * Thang ngu am co tinh chat de chiu: bat ky hai not nao trong thang cung khong nghich
 * tai nhau. Nen dù chon not ngau nhien van luon ra giai dieu nghe duoc — dung thu can
 * cho nhac nen khong duoc gay chu y.
 *
 * NGUYEN TAC THIET KE: nhac nen cho co vua phai CHAN, rat nho, va khong co nhip manh.
 * Nguoi choi dang tinh nuoc di — nhac co giai dieu ro se pha su tap trung.
 */

CC.Bgm = (function () {
  const BEAT = 2.4;            // giay moi nhip — rat cham, khong thuc giuc
  const SCALE = [0, 3, 5, 7, 10];   // ngu am thu, tinh theo nua cung tu not goc
  const ROOT = 220;            // La3 — quang trung, khong chua tai

  /* Vong hop am 4 nhip: thu / quang 6 / quang 4 / quang 5 */
  const CHORDS = [0, -4, -7, -5];

  let timer = null;
  let playing = false;
  let beat = 0;

  function midiToHz(semi) {
    return ROOT * Math.pow(2, semi / 12);
  }

  /* Mot not nen mem — song tam giac qua bo loc thap, vao/ra rat cham */
  function pad(semi, dur, vol) {
    const ctx = CC.Audio.ctx();
    if (!ctx) return;
    const t0 = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = midiToHz(semi);

    // Dao dong thu hai lech nhe -> tieng day hon, do la meo "detune" quen thuoc
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = midiToHz(semi) * 1.005;

    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 900;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + dur * 0.35);   // vao cham
    g.gain.linearRampToValueAtTime(0, t0 + dur);            // ra cham

    osc.connect(f); osc2.connect(f);
    f.connect(g); g.connect(CC.Audio.bgmOut());

    osc.start(t0); osc2.start(t0);
    osc.stop(t0 + dur + 0.05); osc2.stop(t0 + dur + 0.05);
  }

  /* Mot not diem — nhu tieng chuong go nho, thua thot */
  function pluck(semi, delay, vol) {
    const ctx = CC.Audio.ctx();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = midiToHz(semi);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.6);

    osc.connect(g); g.connect(CC.Audio.bgmOut());
    osc.start(t0); osc.stop(t0 + 1.7);
  }

  function step() {
    if (!playing || !CC.Audio.ready()) return;

    const chord = CHORDS[beat % CHORDS.length];

    // Nen: not goc + quang 5
    pad(chord, BEAT * 1.15, 0.16);
    pad(chord + 7, BEAT * 1.15, 0.09);

    /* Not diem: 0-2 not moi nhip, chon ngau nhien trong thang ngu am.
     * Thua thot co chu y — day mot chuoi not lien tuc se thanh giai dieu, ma giai
     * dieu thi keo su chu y ra khoi ban co.
     */
    const n = Math.random() < 0.55 ? 1 : (Math.random() < 0.4 ? 2 : 0);
    for (let i = 0; i < n; i++) {
      const oct = Math.random() < 0.35 ? 24 : 12;
      const note = chord + oct + CC.util.pick(SCALE);
      pluck(note, 0.15 + Math.random() * BEAT * 0.7, 0.055);
    }

    beat++;
    timer = setTimeout(step, BEAT * 1000);
  }

  return {
    isPlaying: () => playing,

    start() {
      if (playing || !CC.Audio.ready()) return;
      if (!CC.Store.prefs().bgm) return;
      playing = true;
      beat = 0;
      CC.Audio.fadeBgm(0.5, 2.5);   // vao rat tu tu
      step();
    },

    stop() {
      playing = false;
      clearTimeout(timer);
      timer = null;
      CC.Audio.fadeBgm(0, 1.0);
    },

    /* Ha nho khi can — dung luc ket thuc van de tieng thang/thua noi len */
    duck(on) {
      if (!playing) return;
      CC.Audio.fadeBgm(on ? 0.16 : 0.5, 0.6);
    },

    init() {
      const B = CC.util.bus;

      // Chi bat nhac khi vao man choi, khong bat o menu
      B.on('screen:changed', ({ name }) => {
        if (name === 'game') CC.Bgm.start();
        else CC.Bgm.stop();
      });

      B.on('audio:ready', () => {
        if (CC.Screens.current() === 'game') CC.Bgm.start();
      });

      B.on('game:over', () => {
        CC.Bgm.duck(true);
        setTimeout(() => CC.Bgm.duck(false), 4000);
      });

      B.on('prefs:changed', ({ key, val }) => {
        if (key !== 'bgm') return;
        if (val && CC.Screens.current() === 'game') CC.Bgm.start();
        else if (!val) CC.Bgm.stop();
      });

      return this;
    }
  };
})();

;
/* ===== js/piece-svg-shapes.js ===== */
/* piece-svg-shapes.js — hinh 6 loai quan co, ve bang SVG
 *
 * Moi quan mo ta bang mot mang hinh co ban trong o vuong 100x100 (goc 0,0).
 * Quan chiem khoang x 18..82, y 8..95 — chua le xung quanh de khong dinh vien o.
 *
 * BA LOP MAU thay vi mot (`fill` / `shade` / `light`):
 * Quan to mot mau tren o co ~44px cua dien thoai nhin bet, kho phan biet Hau voi
 * Vua. Them mot dai toi o chan de va mot vet sang o vai la du de mat nhan ra khoi.
 *
 * `role` cua moi hinh:
 *   (khong co) -> mau than       shade -> dai toi
 *   light      -> vet bat sang   ink   -> net chi tiet ve bang mau vien
 */

CC.Pieces = (function () {
  /* De chung — tao cam giac cung bo. Ba manh: than de, dai toi, vet sang. */
  const BASE = [
    { t: 'path', d: 'M22 95 C22 88 26 84 32 83 L68 83 C74 84 78 88 78 95 Z' },
    { t: 'path', d: 'M22 95 C22 91 24 88 27 86 L73 86 C76 88 78 91 78 95 Z', role: 'shade', noStroke: true },
    { t: 'path', d: 'M30 85 L70 85', role: 'light', fill: 'none', w: 3 }
  ];

  const SHAPES = {
    /* --- TOT --- */
    p: [
      { t: 'circle', cx: 50, cy: 30, r: 13 },
      { t: 'path', d: 'M40 42 C40 53 34 63 32 83 L68 83 C66 63 60 53 60 42 Z' },
      { t: 'path', d: 'M43 55 C42 65 39 72 38 82 L45 82 C45 71 46 63 47 55 Z', role: 'light', noStroke: true },
      { t: 'circle', cx: 45, cy: 26, r: 4, role: 'light', noStroke: true },
      ...BASE
    ],

    /* --- XE --- */
    r: [
      { t: 'path', d: 'M28 20 h11 v8 h7 v-8 h8 v8 h7 v-8 h11 v19 h-44 z' },
      { t: 'path', d: 'M34 39 L36 83 L64 83 L66 39 Z' },
      { t: 'path', d: 'M38 42 L37 82 L44 82 L44 42 Z', role: 'light', noStroke: true },
      { t: 'path', d: 'M34 45 L66 45', role: 'ink', fill: 'none', w: 2.5 },
      ...BASE
    ],

    /* --- MA ---
     * Da ve lai HAI LAN. Ban dau la mot khoi cong khong ra hinh gi (nhin nhu cai
     * nam). Lan hai tai qua dai va manh nen ra hinh con THO.
     *
     * Ba dieu lam nen dau ngua, theo dung thu tu quan trong:
     *   1. MOM dai, nho han ra phia phai va THAP xuong — day la net nhan dang manh
     *      nhat. Thieu no thi moi thu khac deu vo nghia.
     *   2. TAI NGAN, huong ve truoc. Tai dai dung len = con tho.
     *   3. BOM day chay doc gay — lam gay day len, tach khoi phan dau.
     */
    n: [
      {
        t: 'path',
        d: 'M30 83 C28 68 31 57 41 51 '     // gay, tu chan len
         + 'C35 44 34 33 41 26 '            // sau so
         + 'L45 12 L56 25 '                 // tai — ngan, cheo ve truoc
         + 'C66 28 75 36 80 45 '            // tran doc xuong
         + 'C83 50 80 56 72 59 '            // MOM nho ra phai
         + 'C64 62 58 62 56 58 '            // duoi mom, mieng
         + 'C54 64 55 72 58 78 '            // ham xuong co
         + 'C60 81 62 82 64 83 Z'           // nguc xuong chan
      },
      // Bom — day, chay doc gay, mau toi cho tach khoi phan dau
      { t: 'path', d: 'M44 22 C36 31 32 43 34 55 C35 63 34 72 33 79', role: 'shade', fill: 'none', w: 8 },
      // Ma sang tren song mui
      { t: 'path', d: 'M60 30 C69 34 76 41 79 47 C73 44 66 37 60 33 Z', role: 'light', noStroke: true },
      { t: 'circle', cx: 57, cy: 34, r: 3.2, role: 'ink' },                 // mat
      { t: 'circle', cx: 75, cy: 51, r: 2.2, role: 'ink' },                 // lo mui
      { t: 'path', d: 'M64 57 L74 55', role: 'ink', fill: 'none', w: 2 },   // mieng
      ...BASE
    ],

    /* --- TUONG --- */
    b: [
      { t: 'circle', cx: 50, cy: 16, r: 5.5 },
      { t: 'path', d: 'M50 23 C39 31 33 43 33 55 C33 65 40 71 50 71 C60 71 67 65 67 55 C67 43 61 31 50 23 Z' },
      { t: 'path', d: 'M45 31 C39 39 37 48 38 58 C40 63 43 66 46 67 C42 60 41 45 45 31 Z', role: 'light', noStroke: true },
      { t: 'path', d: 'M50 36 L59 47', role: 'ink', fill: 'none', w: 3 },   // khe cheo dac trung
      { t: 'path', d: 'M34 70 h32 v7 h-32 z', role: 'shade' },
      { t: 'path', d: 'M39 77 L37 83 L63 83 L61 77 Z' },
      ...BASE
    ],

    /* --- HAU --- */
    q: [
      { t: 'path', d: 'M29 44 L24 18 L38 32 L45 14 L50 29 L55 14 L62 32 L76 18 L71 44 Z' },
      { t: 'circle', cx: 24, cy: 16, r: 5 },
      { t: 'circle', cx: 45, cy: 12, r: 5 },
      { t: 'circle', cx: 55, cy: 12, r: 5 },
      { t: 'circle', cx: 76, cy: 16, r: 5 },
      { t: 'path', d: 'M28 44 h44 v8 h-44 z', role: 'shade' },
      { t: 'path', d: 'M32 52 C32 64 36 74 36 83 L64 83 C64 74 68 64 68 52 Z' },
      { t: 'path', d: 'M37 54 C37 65 40 74 40 82 L47 82 C46 73 43 64 42 54 Z', role: 'light', noStroke: true },
      ...BASE
    ],

    /* --- VUA --- */
    k: [
      { t: 'path', d: 'M46 6 h8 v7 h7 v8 h-7 v8 h-8 v-8 h-7 v-8 h7 z' },   // thap gia
      { t: 'path', d: 'M31 41 C31 34 39 30 50 30 C61 30 69 34 69 41 L66 50 L34 50 Z' },
      { t: 'path', d: 'M34 50 h32 v6 h-32 z', role: 'shade' },
      { t: 'path', d: 'M34 56 C34 68 38 76 38 83 L62 83 C62 76 66 68 66 56 Z' },
      { t: 'path', d: 'M39 58 C39 68 42 76 42 82 L49 82 C48 74 45 67 44 58 Z', role: 'light', noStroke: true },
      ...BASE
    ]
  };

  return {
    /* Tao nhom SVG cho mot quan.
     * type: 'p'|'r'|'n'|'b'|'q'|'k'   color: 'w'|'b'
     */
    build(type, color) {
      const c = CC.cfg.PIECE[color] || CC.cfg.PIECE.w;
      const g = CC.util.svg('g', { class: 'piece-shape' });

      (SHAPES[type] || SHAPES.p).forEach(s => {
        let fill = c.fill;
        if (s.role === 'shade') fill = c.shade;
        else if (s.role === 'light') fill = c.light;
        else if (s.role === 'ink') fill = c.stroke;
        if (s.fill === 'none') fill = 'none';

        const attrs = {
          fill,
          stroke: s.noStroke ? 'none' : c.stroke,
          'stroke-width': s.w || (s.role === 'ink' ? 2.5 : 4),
          'stroke-linejoin': 'round',
          'stroke-linecap': 'round'
        };
        // Vet sang / dai toi chi la lop trang tri, khong duoc chan chuot
        if (s.role === 'light' || s.role === 'shade') attrs['pointer-events'] = 'none';
        if (s.role === 'light') attrs.opacity = 0.55;

        if (s.t === 'circle') Object.assign(attrs, { cx: s.cx, cy: s.cy, r: s.r });
        else if (s.t === 'rect') Object.assign(attrs, { x: s.x, y: s.y, width: s.w, height: s.h, rx: s.rx });
        else Object.assign(attrs, { d: s.d });

        g.appendChild(CC.util.svg(s.t === 'path' ? 'path' : s.t, attrs));
      });

      return g;
    },

    /* Ten tieng Viet — dung cho cau thoai cua meo va thong bao */
    name(type) {
      return { p: 'Tốt', n: 'Mã', b: 'Tượng', r: 'Xe', q: 'Hậu', k: 'Vua' }[type] || 'quân';
    }
  };
})();

;
/* ===== js/board-svg-render.js ===== */
/* board-svg-render.js — dung ban co SVG va dong bo quan theo the co
 *
 * He toa do: SVG viewBox 0 0 800 800, moi o 100 don vi. Kich thuoc thuc do CSS.
 *
 * Cac lop, tu duoi len:
 *   #layer-squares    64 o vuong (dung mot lan, khong bao gio ve lai)
 *   #layer-marks      to sang: o chon, nuoc vua di, vua bi chieu
 *   #layer-pieces     quan co
 *   #layer-dots       cham tron bao nuoc di duoc (tren quan de khong bi che)
 *   #layer-drag       quan dang duoc keo (tren cung)
 */

CC.Board = (function () {
  const SQ = 100;
  const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  let svg = null, layers = {}, flipped = false;
  let pieceEls = {};      // square -> <g> cua quan dang o do

  /* --- chuyen doi o co <-> toa do --- */

  function fileRank(square) {
    return { f: FILES.indexOf(square[0]), r: parseInt(square[1], 10) - 1 };
  }

  /* Toa do goc tren-trai cua o, da tinh ca viec lat ban */
  function xyOf(square) {
    const { f, r } = fileRank(square);
    return {
      x: (flipped ? 7 - f : f) * SQ,
      y: (flipped ? r : 7 - r) * SQ
    };
  }

  /* Nguoc lai: tu toa do trong SVG ra ten o. Tra null neu ra ngoai ban. */
  function squareAtXY(x, y) {
    let col = Math.floor(x / SQ), row = Math.floor(y / SQ);
    if (col < 0 || col > 7 || row < 0 || row > 7) return null;
    const f = flipped ? 7 - col : col;
    const r = flipped ? row : 7 - row;
    return FILES[f] + (r + 1);
  }

  /* Tu toa do con tro tren man hinh ra ten o — dung cho cham va keo tha */
  function squareAtClient(clientX, clientY) {
    const box = svg.getBoundingClientRect();
    if (!box.width || !box.height) return null;
    const x = (clientX - box.left) / box.width * (8 * SQ);
    const y = (clientY - box.top) / box.height * (8 * SQ);
    return squareAtXY(x, y);
  }

  /* --- dung ban --- */

  function buildSquares() {
    const g = layers.squares;
    g.textContent = '';
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Mau o khong doi khi lat ban: a1 luon la o toi
        const sq = squareAtXY(col * SQ, row * SQ);
        const { f, r } = fileRank(sq);
        g.appendChild(CC.util.svg('rect', {
          x: col * SQ, y: row * SQ, width: SQ, height: SQ,
          class: 'sq ' + ((f + r) % 2 === 0 ? 'sq-dark' : 'sq-light'),
          'data-square': sq
        }));
      }
    }
  }

  /* Toa do a-h va 1-8 in nho o ria — giup nguoi moi doc duoc nuoc di */
  function buildCoords() {
    const g = layers.coords;
    g.textContent = '';
    for (let i = 0; i < 8; i++) {
      const file = FILES[flipped ? 7 - i : i];
      const rank = flipped ? i + 1 : 8 - i;
      const dark = i % 2 === 0;
      g.appendChild(CC.util.svg('text', {
        x: i * SQ + SQ - 8, y: 8 * SQ - 8,
        class: 'coord ' + (dark ? 'coord-on-light' : 'coord-on-dark'),
        'text-anchor': 'end', text: file
      }));
      g.appendChild(CC.util.svg('text', {
        x: 7, y: i * SQ + 22,
        class: 'coord ' + (dark ? 'coord-on-dark' : 'coord-on-light'),
        text: String(rank)
      }));
    }
  }

  /* --- quan co --- */

  function makePiece(p) {
    const g = CC.util.svg('g', {
      class: 'piece piece-' + p.color,
      'data-square': p.square,
      'data-type': p.type,
      'data-color': p.color
    });
    g.appendChild(CC.Pieces.build(p.type, p.color));
    setPos(g, p.square);
    return g;
  }

  /* Dat vi tri bang thuoc tinh CSS transform (khong phai thuoc tinh SVG)
   * de CSS transition chay duoc — day la ly do quan truot muot khi di.
   */
  function setPos(el, square) {
    const { x, y } = xyOf(square);
    el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  }

  const api = {
    /* Dung khung ban co mot lan duy nhat */
    mount(container) {
      svg = CC.util.svg('svg', {
        class: 'board',
        viewBox: '0 0 ' + (8 * SQ) + ' ' + (8 * SQ),
        xmlns: 'http://www.w3.org/2000/svg'
      });
      ['squares', 'coords', 'marks', 'pieces', 'dots', 'drag'].forEach(name => {
        layers[name] = CC.util.svg('g', { class: 'layer layer-' + name });
        svg.appendChild(layers[name]);
      });
      container.appendChild(svg);
      buildSquares();
      buildCoords();
      return api;
    },

    svgEl: () => svg,
    layer: name => layers[name],
    squareAtClient,
    xyOf,
    isFlipped: () => flipped,

    setFlipped(v) {
      if (flipped === v) return;
      flipped = v;
      buildSquares();
      buildCoords();
      // Quan giu nguyen, chi doi cho — co transition nen nhin nhu ban xoay
      Object.keys(pieceEls).forEach(sq => setPos(pieceEls[sq], sq));
      CC.util.bus.emit('board:flipped', flipped);
    },

    /* Dong bo quan tren ban voi the co hien tai.
     * opts.moved = {from,to} thi quan do truot tu o cu sang o moi.
     *
     * Cach lam: dung lai element cu khi co the, chi tao/xoa phan khac biet.
     * Ve lai toan bo moi nuoc se lam mat transition va nhap nhay tren may yeu.
     */
    sync(opts) {
      opts = opts || {};
      const want = {};
      /* `opts.pieces` cho phep ve MOT THE CO BAT KY, khong nhat thiet la the dang
       * choi — tinh nang xem lai nuoc truoc dua the co cu vao day. Khong truyen
       * thi lay the co hien tai nhu binh thuong. */
      (opts.pieces || CC.Rules.pieces()).forEach(p => { want[p.square] = p; });

      // 1. Quan di chuyen: doi khoa truoc de buoc 2 khong xoa nham
      if (opts.moved) {
        const el = pieceEls[opts.moved.from];
        if (el && !want[opts.moved.from]) {
          delete pieceEls[opts.moved.from];
          // O dich co quan cu (bi an) thi go ngay
          if (pieceEls[opts.moved.to]) {
            pieceEls[opts.moved.to].remove();
            delete pieceEls[opts.moved.to];
          }
          el.dataset.square = opts.moved.to;
          pieceEls[opts.moved.to] = el;
          setPos(el, opts.moved.to);
        }
      }

      // 2. Go quan khong con dung cho
      Object.keys(pieceEls).forEach(sq => {
        const p = want[sq], el = pieceEls[sq];
        if (!p || p.type !== el.dataset.type || p.color !== el.dataset.color) {
          el.remove();
          delete pieceEls[sq];
        }
      });

      // 3. Them quan con thieu
      Object.keys(want).forEach(sq => {
        if (pieceEls[sq]) return;
        const el = makePiece(want[sq]);
        pieceEls[sq] = el;
        layers.pieces.appendChild(el);
      });

      /* 4. Dat lai vi tri CHO MOI QUAN — buoc nay lam sync() tro nen idempotent.
       *
       * LOI DA SUA: truoc day buoc nay khong co, sync() chi dat vi tri cho quan
       * moi tao hoac quan vua di. Hau qua: bat ky ai lam sai vi tri mot quan thi
       * sync() KHONG chua duoc. Da dinh that — nhac quan len roi tha lai cho cu,
       * board-interaction xoa transform (thanh translate(0,0) = o goc tren-trai),
       * va quan nam ket o do vi sync() khong dung toi no nua.
       *
       * Ghi de cung gia tri transform khong kich hoat lai transition, nen khong
       * anh huong hieu ung truot quan. 32 phan tu, chi phi khong dang ke.
       */
      Object.keys(pieceEls).forEach(sq => {
        const el = pieceEls[sq];
        if (el.classList.contains('dragging')) return;   // dang keo thi de yen
        setPos(el, sq);
      });

      return api;
    },

    pieceAt: square => pieceEls[square] || null,

    /* Xoa sach quan — dung khi bat dau van moi */
    clearPieces() {
      Object.values(pieceEls).forEach(el => el.remove());
      pieceEls = {};
    }
  };

  return api;
})();

;
/* ===== js/board-highlight.js ===== */
/* board-highlight.js — cac lop to sang tren ban co
 *
 * Bon loai dau hieu, moi loai mot muc dich ro rang:
 *   selected   o dang chon              — vien vang day
 *   lastMove   nuoc vua di (2 o)        — nen vang nhat, giup khong bo lo nuoc cua doi thu
 *   check      vua dang bi chieu        — quang do
 *   dots       cac o di duoc            — cham tron; o co quan dich thi ve vong tron rong
 *
 * Rieng `dots` nam o lop tren quan co, neu khong cham se bi quan che mat.
 */

CC.Highlight = (function () {
  const SQ = 100;
  let marks = null, dots = null;

  function rectAt(square, cls) {
    const { x, y } = CC.Board.xyOf(square);
    return CC.util.svg('rect', { x, y, width: SQ, height: SQ, class: cls });
  }

  const api = {
    init() {
      marks = CC.Board.layer('marks');
      dots = CC.Board.layer('dots');
      // Lat ban thi moi dau hieu phai ve lai theo toa do moi
      CC.util.bus.on('board:flipped', () => api.redraw());
      return api;
    },

    /* Trang thai hien tai, giu lai de ve lai duoc khi lat ban */
    state: { selected: null, lastMove: null, check: null, moves: [] },

    setSelected(square) { api.state.selected = square; api.redraw(); },
    setLastMove(mv) { api.state.lastMove = mv ? { from: mv.from, to: mv.to } : null; api.redraw(); },
    setCheck(square) { api.state.check = square; api.redraw(); },

    /* moves: mang [{to, captured}] — o co quan an duoc ve khac cho de nhin */
    setMoves(moves) { api.state.moves = moves || []; api.redraw(); },

    clearMoves() { api.state.moves = []; api.state.selected = null; api.redraw(); },

    clearAll() {
      api.state = { selected: null, lastMove: null, check: null, moves: [] };
      api.redraw();
    },

    redraw() {
      const s = api.state;
      marks.textContent = '';
      dots.textContent = '';

      if (s.lastMove) {
        marks.appendChild(rectAt(s.lastMove.from, 'mk mk-last'));
        marks.appendChild(rectAt(s.lastMove.to, 'mk mk-last'));
      }
      if (s.check) marks.appendChild(rectAt(s.check, 'mk mk-check'));
      if (s.selected) marks.appendChild(rectAt(s.selected, 'mk mk-selected'));

      s.moves.forEach(m => {
        const { x, y } = CC.Board.xyOf(m.to);
        if (m.captured) {
          // Vong tron rong bao quanh quan an duoc — khong che mat hinh quan
          dots.appendChild(CC.util.svg('circle', {
            cx: x + SQ / 2, cy: y + SQ / 2, r: 44, class: 'dot dot-capture'
          }));
        } else {
          dots.appendChild(CC.util.svg('circle', {
            cx: x + SQ / 2, cy: y + SQ / 2, r: 15, class: 'dot dot-move'
          }));
        }
      });
    }
  };

  return api;
})();

;
/* ===== js/board-interaction.js ===== */
/* board-interaction.js — BAM-CHON-BAM-DI va KEO-THA, ca hai cung hoat dong
 *
 * Vi sao can ca hai: tren dien thoai bam la chinh (chinh xac, khong moi tay),
 * nhung nguoi quen choi tren may tinh se thay guong neu khong keo duoc.
 *
 * BON KIEU THAO TAC deu phai chay dung:
 *   1. Bam quan -> bam o dich          (kieu pho bien nhat, nhat la tren dien thoai)
 *   2. Keo quan tha vao o dich         (quen thuoc voi nguoi choi tren may tinh)
 *   3. Bam quan -> bam lai chinh no    = bo chon
 *   4. Bam quan -> bam quan khac cua minh = doi lua chon
 *
 * Kieu 1 tung KHONG chay duoc suot mot thoi gian dai: `select()` o pointerdown bi
 * chinh pointerup cua cu bam do huy mat. Xem ghi chu o onPointerUp.
 *
 * Dung Pointer Events de mot doan ma lo ca chuot lan cham — khong viet hai nhanh.
 *
 * Ba diem quan trong cho dien thoai:
 *   1. `touch-action: none` tren ban co (dat trong CSS) — neu khong keo quan se cuon trang
 *   2. Quan dang keo ve LECH LEN TREN ngon tay, khong thi ngon che mat quan
 *   3. Phai keo qua nguong DRAG_START moi tinh la keo — nguoi cham thuong xe tay vai pixel
 */

CC.Interaction = (function () {
  const DRAG_START = 6;        // px tren man hinh, vuot qua moi tinh la keo
  const TOUCH_LIFT = 45;       // don vi SVG, do cao nhac quan len khoi ngon tay

  let hooks = { canMove: () => false, onMove: () => {} };
  let sel = null;              // o dang chon
  let drag = null;             // {from, el, startX, startY, moved, pointerType}
  let enabled = true;
  let justSelected = false;    // o vua duoc chon trong chinh cu bam dang xu ly

  /* Cac nuoc di duoc tu o dang chon, dang {to, captured} cho lop to sang */
  function movesOf(square) {
    return CC.Rules.movesFrom(square).map(m => ({
      to: m.to,
      captured: !!m.captured
    }));
  }

  function select(square) {
    sel = square;
    CC.Highlight.setSelected(square);
    CC.Highlight.setMoves(movesOf(square));
  }

  function deselect() {
    sel = null;
    CC.Highlight.clearMoves();
  }

  /* Nuoc di co nam trong danh sach hop le khong */
  function isLegal(from, to) {
    return CC.Rules.movesFrom(from).some(m => m.to === to);
  }

  function tryMove(from, to) {
    deselect();
    if (from === to) return;
    if (!isLegal(from, to)) return;
    hooks.onMove(from, to);
  }

  /* --- keo tha --- */

  function dragTo(clientX, clientY) {
    const svg = CC.Board.svgEl();
    const box = svg.getBoundingClientRect();
    const scale = (8 * 100) / box.width;
    const x = (clientX - box.left) * scale;
    const y = (clientY - box.top) * scale;
    const lift = drag.pointerType === 'touch' ? TOUCH_LIFT : 0;
    // Tru 50 de tam quan trung con tro (o rong 100 don vi)
    drag.el.style.transform = 'translate(' + (x - 50) + 'px,' + (y - 50 - lift) + 'px)';
  }

  function startDrag(square, ev) {
    const el = CC.Board.pieceAt(square);
    if (!el) return;
    drag = {
      from: square, el,
      startX: ev.clientX, startY: ev.clientY,
      moved: false, pointerType: ev.pointerType
    };
  }

  function liftDrag() {
    drag.moved = true;
    drag.el.classList.add('dragging');
    CC.Board.layer('drag').appendChild(drag.el);   // dua len lop tren cung
  }

  function endDrag(clientX, clientY) {
    if (!drag) return;
    const d = drag;
    drag = null;

    d.el.classList.remove('dragging');
    if (d.moved) {
      // Tra quan ve lop thuong roi de sync() dat lai dung vi tri.
      // KHONG duoc xoa transform o day: transform rong = translate(0,0) = o goc
      // tren-trai ban co. sync() gio tu dat lai vi tri cho moi quan.
      CC.Board.layer('pieces').appendChild(d.el);
      CC.Board.sync();
    }

    const to = CC.Board.squareAtClient(clientX, clientY);
    if (d.moved) {
      if (to && to !== d.from && isLegal(d.from, to)) tryMove(d.from, to);
      else { deselect(); CC.Board.sync(); }
    }
    // Neu khong keo (chi cham) thi de logic cham o pointerup xu ly
    return d;
  }

  /* --- xu ly su kien --- */

  function onPointerDown(ev) {
    if (!enabled) return;

    /* Chuot phai = huy lua chon. Quen thuoc voi nguoi choi co online, va nhanh hon
     * la phai bam dung lai vao o da chon. */
    if (ev.button === 2) { deselect(); return; }

    const sq = CC.Board.squareAtClient(ev.clientX, ev.clientY);
    if (!sq) return;

    const mine = hooks.canMove(sq);
    justSelected = false;

    if (mine) {
      // Bam vao quan cua minh: vua chon vua san sang keo
      /* `justSelected` ghi lai rang o nay VUA duoc chon trong chinh cu bam nay.
       * Xem giai thich day du o onPointerUp — thieu no thi chon xong bi bo chon
       * ngay lap tuc, va ca kieu bam-chon-bam-di khong bao gio chay duoc. */
      justSelected = (sel !== sq);
      select(sq);
      startDrag(sq, ev);
      capture(ev);
    } else if (sel) {
      // Bam vao o khac khi dang chon: coi nhu di nuoc (xu ly o pointerup)
      capture(ev);
    }
    ev.preventDefault();
  }

  /* Bat con tro de con nhan duoc pointermove/up ke ca khi ngon tay ra ngoai ban co.
   *
   * PHAI BOC try/catch: setPointerCapture nem loi neu con tro do khong con hoat dong
   * (bi huy giua chung, hoac su kien duoc phat bang ma). Neu de no nem thi dong
   * `ev.preventDefault()` ngay sau bi bo qua — hau qua la keo quan tren dien thoai
   * lam CUON TRANG hoac boi den chu. Bat duoc con tro hay khong chi la toi uu; con
   * preventDefault thi bat buoc phai chay.
   */
  function capture(ev) {
    try { CC.Board.svgEl().setPointerCapture(ev.pointerId); }
    catch (e) { /* khong bat duoc thi thoi, van choi binh thuong */ }
  }

  function onPointerMove(ev) {
    if (!drag) return;
    if (!drag.moved) {
      const dx = ev.clientX - drag.startX, dy = ev.clientY - drag.startY;
      if (Math.hypot(dx, dy) < DRAG_START) return;
      liftDrag();
    }
    dragTo(ev.clientX, ev.clientY);
    ev.preventDefault();
  }

  function onPointerUp(ev) {
    if (!enabled) return;
    const sq = CC.Board.squareAtClient(ev.clientX, ev.clientY);
    const d = drag ? endDrag(ev.clientX, ev.clientY) : null;

    // Da keo va tha xong roi thi khong xu ly nhu cu cham nua
    if (d && d.moved) return;

    if (!sq) { deselect(); return; }

    if (sel && sel !== sq && isLegal(sel, sq)) {
      tryMove(sel, sq);                 // bam o dich -> di nuoc
    } else if (sel === sq) {
      /* LOI DA SUA — day la ly do kieu BAM-CHON-BAM-DI khong bao gio chay duoc,
       * chi con keo-tha dung duoc.
       *
       * `select()` xay ra o pointerdown, con nhanh nay chay o pointerup cua CHINH
       * cu bam do. Truoc day no thay `sel === sq` va tuong nguoi choi bam lan hai
       * de bo chon -> xoa lua chon ngay khi vua chon xong.
       *
       * `justSelected` phan biet hai truong hop: vua chon trong cu bam nay (giu
       * nguyen), hay bam lai o da chon tu truoc (moi la y muon bo chon).
       */
      if (!justSelected) deselect();
    } else if (hooks.canMove(sq)) {
      select(sq);                       // doi sang quan khac cua minh
    } else {
      deselect();
    }

    justSelected = false;
  }

  function onPointerCancel() {
    if (drag) {
      const d = drag; drag = null;
      d.el.classList.remove('dragging');
      CC.Board.layer('pieces').appendChild(d.el);
      CC.Board.sync();          // sync() tu dat lai vi tri, xem ghi chu o endDrag
    }
    deselect();
  }

  return {
    /* hooks.canMove(square) -> co duoc phep cam quan o o nay khong
     * hooks.onMove(from,to) -> game-flow lo phan con lai (ke ca phong cap)
     */
    init(h) {
      hooks = Object.assign(hooks, h);
      const svg = CC.Board.svgEl();
      svg.addEventListener('pointerdown', onPointerDown);
      svg.addEventListener('pointermove', onPointerMove);
      svg.addEventListener('pointerup', onPointerUp);
      svg.addEventListener('pointercancel', onPointerCancel);
      // Chan menu chuot phai tren ban co — hay bat nham khi cham giu tren dien thoai
      svg.addEventListener('contextmenu', e => e.preventDefault());
      return this;
    },

    /* Khoa tuong tac khi den luot meo hoac dang hien hop thoai */
    setEnabled(v) {
      enabled = v;
      if (!v) { onPointerCancel(); }
    },

    deselect,
    selected: () => sel
  };
})();

;
/* ===== js/ui-board-fx.js ===== */
/* ui-board-fx.js — hieu ung hinh anh tren ban co
 *
 * Nguyen tac: hieu ung phai NOI LEN THONG TIN, khong chi de dep.
 *   an quan   -> vun bay ra tu o do        (thay ngay vua mat quan o dau)
 *   bi chieu  -> o Vua nhap do             (thu quan trong nhat, phai noi bat)
 *   phong cap -> hao quang tai o phong cap (su kien hiem, dang duoc nhan manh)
 *   chieu het -> phao giay tren ban         (an mung ket thuc)
 *
 * Ve vao lop `marks` cua ban co roi TU XOA sau khi chay xong — khong de rac DOM.
 * Ton trong `prefers-reduced-motion` va tuy chon `fx` cua nguoi choi.
 */

CC.BoardFx = (function () {
  const SQ = 100;

  function on() {
    if (!CC.Store.prefs().fx) return false;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return true;
  }

  /* Lop rieng cho hieu ung, nam tren quan co de vun khong bi che */
  function layer() {
    return CC.Board.layer('dots');
  }

  function center(square) {
    const p = CC.Board.xyOf(square);
    return { x: p.x + SQ / 2, y: p.y + SQ / 2 };
  }

  /* Xoa mot nhom sau `ms` — moi hieu ung tu don rac cua no */
  function autoRemove(el, ms) {
    setTimeout(() => { if (el.parentNode) el.remove(); }, ms);
  }

  const api = {
    /* Vun bay ra khi an quan */
    burst(square, color) {
      if (!on()) return;
      const { x, y } = center(square);
      const g = CC.util.svg('g', { class: 'fx-burst' });
      const tint = color === 'w' ? '#f8f3e9' : '#5c4d3e';

      for (let i = 0; i < 10; i++) {
        const a = (Math.PI * 2 * i) / 10 + Math.random() * 0.5;
        const d = 34 + Math.random() * 26;
        const bit = CC.util.svg('circle', {
          cx: x, cy: y, r: 3.5 + Math.random() * 3,
          fill: tint, opacity: 0.95
        });
        // Bay ra theo huong ngau nhien roi mo dan
        bit.style.setProperty('--dx', Math.cos(a) * d + 'px');
        bit.style.setProperty('--dy', Math.sin(a) * d + 'px');
        bit.style.animationDelay = (Math.random() * 0.05) + 's';
        g.appendChild(bit);
      }
      layer().appendChild(g);
      autoRemove(g, 700);
    },

    /* O Vua nhap do khi bi chieu */
    checkPulse(square) {
      if (!on() || !square) return;
      const p = CC.Board.xyOf(square);
      const r = CC.util.svg('rect', {
        x: p.x, y: p.y, width: SQ, height: SQ, class: 'fx-check-pulse'
      });
      layer().appendChild(r);
      autoRemove(r, 1000);
    },

    /* Hao quang khi tot phong cap */
    promoteGlow(square) {
      if (!on()) return;
      const { x, y } = center(square);
      const g = CC.util.svg('g', { class: 'fx-promote' });
      [30, 44, 58].forEach((r, i) => {
        const c = CC.util.svg('circle', {
          cx: x, cy: y, r, fill: 'none',
          stroke: '#ffd166', 'stroke-width': 4
        });
        c.style.animationDelay = (i * 0.12) + 's';
        g.appendChild(c);
      });
      layer().appendChild(g);
      autoRemove(g, 1200);
    },

    /* Phao giay khi ket thuc van */
    confetti() {
      if (!on()) return;
      const g = CC.util.svg('g', { class: 'fx-confetti' });
      const colors = ['#f0a860', '#7fc07f', '#ffd166', '#f7a8b8', '#7fd4f5'];
      for (let i = 0; i < 34; i++) {
        const x = Math.random() * 8 * SQ;
        const bit = CC.util.svg('rect', {
          x, y: -20, width: 7, height: 12,
          fill: CC.util.pick(colors),
          transform: 'rotate(' + (Math.random() * 90) + ' ' + x + ' 0)'
        });
        bit.style.animationDelay = (Math.random() * 0.7) + 's';
        bit.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
        g.appendChild(bit);
      }
      layer().appendChild(g);
      autoRemove(g, 3200);
    },

    init() {
      const B = CC.util.bus;

      B.on('game:move', ({ move }) => {
        // An quan: vun mau cua quan BI AN
        if (move.captured) {
          const victim = move.color === 'w' ? 'b' : 'w';
          api.burst(move.to, victim);
        }
        if (move.promotion) api.promoteGlow(move.to);

        if (CC.Rules.inCheck()) {
          const k = CC.Rules.kingSquare(CC.Rules.turn());
          setTimeout(() => api.checkPulse(k), 120);
        }
      });

      B.on('game:over', ({ result }) => {
        // Chi ban phao khi co ben thang — hoa thi khong
        if (result.winner) setTimeout(api.confetti, 400);
      });

      return api;
    }
  };

  return api;
})();

;
/* ===== js/ui-promotion-dialog.js ===== */
/* ui-promotion-dialog.js — hop chon quan khi tot phong cap
 *
 * Tra ve Promise nen game-flow chi can `await`. Mac dinh Hau (bam ra ngoai cung
 * chon Hau) vi 99% truong hop nguoi choi muon Hau — bat ho chon lai la phien.
 */

CC.Promotion = (function () {
  const ORDER = ['q', 'r', 'b', 'n'];
  let overlay = null;

  function build(color, onPick) {
    const box = CC.util.el('div', { class: 'promo-box' }, [
      CC.util.el('div', { class: 'promo-title', text: 'Phong cấp thành' })
    ]);

    const row = CC.util.el('div', { class: 'promo-row' });
    ORDER.forEach(type => {
      const svg = CC.util.svg('svg', { viewBox: '0 0 100 100', class: 'promo-piece' });
      svg.appendChild(CC.Pieces.build(type, color));

      const btn = CC.util.el('button', {
        class: 'promo-btn',
        type: 'button',
        'aria-label': CC.Pieces.name(type),
        onclick: () => onPick(type)
      });
      btn.appendChild(svg);
      btn.appendChild(CC.util.el('span', { class: 'promo-name', text: CC.Pieces.name(type) }));
      row.appendChild(btn);
    });

    box.appendChild(row);
    return CC.util.el('div', {
      class: 'promo-overlay',
      onclick: e => { if (e.target === overlay) onPick('q'); }   // bam ra ngoai = Hau
    }, [box]);
  }

  return {
    /* color: 'w'|'b' — mau cua ben dang phong cap */
    ask(color) {
      return new Promise(resolve => {
        const done = type => {
          if (overlay) { overlay.remove(); overlay = null; }
          document.removeEventListener('keydown', onKey);
          resolve(type);
        };
        const onKey = e => {
          if (e.key === 'Escape') done('q');
          const i = ['1', '2', '3', '4'].indexOf(e.key);
          if (i >= 0) done(ORDER[i]);
        };

        overlay = build(color, done);
        document.body.appendChild(overlay);
        document.addEventListener('keydown', onKey);
        // Cho trinh duyet ve xong roi moi bat hieu ung hien vao
        requestAnimationFrame(() => overlay.classList.add('show'));
      });
    }
  };
})();

;
/* ===== js/engine-uci-parser.js ===== */
/* engine-uci-parser.js — boc dong UCI cua Stockfish thanh object
 *
 * DIEM DE SAI NHAT trong ca phan engine, nen viet rieng mot file va giai thich ky:
 *
 * 1. `score cp N`   = hon N phan tram con tot
 *    `score mate N` = chieu het sau N nuoc
 *    Hai thang do khac nhau. Phai quy ve MOT thang chung, khong thi buoc sap xep
 *    nuoc di o engine-move-selector se loan (chieu het bi xep duoi hon quan).
 *
 * 2. Diem so LUON theo goc nhin BEN DANG DI, khong phai luon theo Trang.
 *    Vi game luon hoi engine o luot cua meo, so duong = tot cho meo. Khong can lat dau.
 *    Nham cho nay thi meo se tu chon nuoc te nhat cho chinh no ma rat kho phat hien.
 *
 * 3. `score cp N lowerbound/upperbound` la diem chua chac chan giua chung tim kiem.
 *    Bo qua, chi lay dong day du.
 */

CC.UciParser = (function () {
  const MATE_BASE = 100000;

  /* Quy `mate N` ve thang diem chung.
   * mate 3  ->  +99997  (chieu het cang nhanh cang tot)
   * mate -3 ->  -99997  (bi chieu het cang cham cang do te)
   */
  function mateToScore(n) {
    return n > 0 ? (MATE_BASE - n) : -(MATE_BASE + n);
  }

  return {
    MATE_BASE,
    isMateScore: s => Math.abs(s) > MATE_BASE - 1000,

    /* So nuoc toi chieu het, hoac null neu khong phai diem chieu het */
    mateIn(score) {
      if (Math.abs(score) <= MATE_BASE - 1000) return null;
      return score > 0 ? MATE_BASE - score : -(MATE_BASE + score);
    },

    /* Boc mot dong `info ...`. Tra null neu dong khong dung de tinh nuoc di. */
    parseInfo(line) {
      if (line.indexOf('info ') !== 0) return null;
      if (line.indexOf(' pv ') < 0) return null;                 // khong co nuoc di -> bo
      if (/\b(lowerbound|upperbound)\b/.test(line)) return null; // diem chua chac chan -> bo

      const tok = line.split(/\s+/);
      const out = { depth: 0, multipv: 1, score: 0, mate: null, pv: [], nodes: 0, time: 0 };

      for (let i = 1; i < tok.length; i++) {
        switch (tok[i]) {
          case 'depth':   out.depth = parseInt(tok[++i], 10); break;
          case 'multipv': out.multipv = parseInt(tok[++i], 10); break;
          case 'nodes':   out.nodes = parseInt(tok[++i], 10); break;
          case 'time':    out.time = parseInt(tok[++i], 10); break;
          case 'score':
            if (tok[i + 1] === 'cp') { out.score = parseInt(tok[i + 2], 10); i += 2; }
            else if (tok[i + 1] === 'mate') {
              out.mate = parseInt(tok[i + 2], 10);
              out.score = mateToScore(out.mate);
              i += 2;
            }
            break;
          case 'pv':
            out.pv = tok.slice(i + 1).filter(Boolean);
            i = tok.length;
            break;
        }
      }

      if (!out.pv.length) return null;
      out.move = out.pv[0];
      return out;
    },

    /* Boc dong `bestmove e2e4 ponder e7e5`.
     * `bestmove (none)` khi het nuoc di — tra move: null, KHONG phai loi.
     */
    parseBestmove(line) {
      if (line.indexOf('bestmove') !== 0) return null;
      const tok = line.split(/\s+/);
      const mv = tok[1];
      return {
        move: (!mv || mv === '(none)' || mv === '0000') ? null : mv,
        ponder: tok[3] || null
      };
    }
  };
})();

;
/* ===== js/engine-worker-bridge.js ===== */
/* engine-worker-bridge.js — noi chuyen voi Stockfish qua Web Worker
 *
 * Bon cai bay cua giao thuc UCI, deu xu ly tuong minh o day:
 *
 *   1. Lenh gui truoc khi engine san sang se bi NUOT mat. Phai cho `uciok` roi
 *      `readyok` moi duoc gui lenh that. Day la ly do co hang doi.
 *   2. Moi luot tim kiem phai doi `bestmove` truoc khi gui luot sau, khong thi
 *      hai luot tron ket qua vao nhau.
 *   3. Engine co the treo ngam. Dat thoi han — qua han thi khoi dong lai Worker
 *      thay vi de nguoi choi ngoi cho mai.
 *   4. Stockfish tim file .wasm theo TEN FILE .js canh no, nen KHONG duoc doi ten
 *      hay gop hai file nay vao bundle (xem build.mjs).
 */

CC.EngineBridge = (function () {
  const BOOT_TIMEOUT = 30000;   // nap engine (bao gom tai .wasm ~560KB)
  const SEARCH_TIMEOUT = 15000; // mot luot tim kiem

  let worker = null;
  let ready = false;
  let booting = null;           // Promise dang nap, de nhieu noi goi cung dung mot lan nap

  let onLine = null;            // handler cho luot tim kiem dang chay
  const optionCache = {};       // tranh gui lai setoption khong doi

  function send(cmd) {
    if (!worker) return;
    worker.postMessage(cmd);
  }

  /* Nap engine. Goi nhieu lan van chi nap mot lan. */
  function boot() {
    if (ready) return Promise.resolve(true);
    if (booting) return booting;

    booting = new Promise((resolve, reject) => {
      let done = false;
      let sawUciok = false;

      const fail = msg => {
        if (done) return;
        done = true;
        booting = null;
        try { if (worker) worker.terminate(); } catch (e) { /* khong sao */ }
        worker = null;
        ready = false;
        reject(new Error(msg));
      };

      const timer = setTimeout(() => fail('Nạp engine quá lâu (quá ' + (BOOT_TIMEOUT / 1000) + 's)'), BOOT_TIMEOUT);

      try {
        worker = new Worker(CC.cfg.ENGINE_PATH);
      } catch (e) {
        clearTimeout(timer);
        return fail('Không tạo được Worker: ' + e.message);
      }

      worker.onerror = e => {
        clearTimeout(timer);
        fail('Worker lỗi: ' + (e.message || 'không rõ nguyên nhân'));
      };

      worker.onmessage = ev => {
        const line = typeof ev.data === 'string' ? ev.data : (ev.data && ev.data.data);
        if (typeof line !== 'string') return;

        if (line === 'uciok') { sawUciok = true; send('isready'); return; }
        if (line === 'readyok' && sawUciok && !done) {
          done = true;
          clearTimeout(timer);
          ready = true;
          booting = null;
          // Tu day tro di moi dong deu chuyen cho luot tim kiem dang chay
          worker.onmessage = e2 => {
            const l = typeof e2.data === 'string' ? e2.data : (e2.data && e2.data.data);
            if (typeof l === 'string' && onLine) onLine(l);
          };
          resolve(true);
          return;
        }
        CC.util.bus.emit('engine:boot-line', line);
      };

      send('uci');
    });

    return booting;
  }

  /* Dat tuy chon UCI. Bo qua neu gia tri khong doi — do gui lai ton thoi gian. */
  function setOption(name, value) {
    if (optionCache[name] === value) return;
    optionCache[name] = value;
    send('setoption name ' + name + ' value ' + value);
  }

  /* Hang doi noi tiep — DAT O DAY, khong phai o lop tren.
   *
   * Rang buoc "mot Worker khong chay hai luot tim kiem cung luc" la tinh chat cua
   * CHINH BRIDGE nay. Neu de lop tren tu giu ky luat thi bat ky doan ma nao goi
   * thang vao day se lam hong ca hai luot — va trieu chung la "engine khong phan
   * hoi", rat kho lan ra nguyen nhan. Da dinh dung mot lan luc kiem thu.
   */
  let chain = Promise.resolve();

  function search(opts) {
    const run = chain.then(() => searchNow(opts));
    // Nuot loi o mat xich de mot lan hong khong lam ket ca hang doi
    chain = run.then(() => {}, () => {});
    return run;
  }

  /* Chay mot luot tim kiem.
   *
   * opts: {fen, depth?, movetime?, multipv?, limitStrength?, elo?}
   * Tra ve {best, lines:[{move,score,depth,mate,pv}]} — lines la cac ung vien
   * MultiPV o do sau sau cung, da sap xep tot->kem.
   */
  async function searchNow(opts) {
    await boot();

    // Dat lai truong hop truoc do dung UCI_Elo ma lan nay khong
    if (opts.limitStrength) {
      setOption('UCI_LimitStrength', 'true');
      setOption('UCI_Elo', String(opts.elo));
    } else {
      setOption('UCI_LimitStrength', 'false');
    }
    setOption('MultiPV', String(opts.multipv || 1));

    return new Promise((resolve, reject) => {
      const byPv = {};        // multipv -> dong tot nhat o do sau lon nhat
      let finished = false;

      const timer = setTimeout(() => {
        if (finished) return;
        finished = true;
        onLine = null;
        // Engine treo: bo Worker va nap lai o lan goi sau
        try { if (worker) worker.terminate(); } catch (e) { /* khong sao */ }
        worker = null; ready = false; booting = null;
        Object.keys(optionCache).forEach(k => delete optionCache[k]);
        reject(new Error('Engine không phản hồi'));
      }, SEARCH_TIMEOUT);

      onLine = line => {
        const info = CC.UciParser.parseInfo(line);
        if (info) {
          const cur = byPv[info.multipv];
          if (!cur || info.depth >= cur.depth) byPv[info.multipv] = info;
          return;
        }

        const bm = CC.UciParser.parseBestmove(line);
        if (bm && !finished) {
          finished = true;
          clearTimeout(timer);
          onLine = null;

          const lines = Object.keys(byPv)
            .sort((a, b) => a - b)             // theo thu tu multipv 1,2,3...
            .map(k => byPv[k])
            .filter(Boolean);

          resolve({ best: bm.move, lines });
        }
      };

      send('ucinewgame');
      send('position fen ' + opts.fen);
      if (opts.movetime) send('go movetime ' + opts.movetime);
      else send('go depth ' + (opts.depth || 8));
    });
  }

  return {
    boot,
    search,
    isReady: () => ready,

    /* Dung han engine — dung khi roi man hinh choi, tranh ro bo nho */
    dispose() {
      try { if (worker) worker.terminate(); } catch (e) { /* khong sao */ }
      worker = null; ready = false; booting = null; onLine = null;
      Object.keys(optionCache).forEach(k => delete optionCache[k]);
    }
  };
})();

;
/* ===== js/engine-elo-profiles.js ===== */
/* engine-elo-profiles.js — bang 8 muc suc manh cua meo
 *
 * VI SAO PHAI TU VIET LOP LAM YEU:
 * Stockfish co san UCI_LimitStrength + UCI_Elo, nhung UCI_Elo TOI THIEU LA 1320,
 * nen ca dai duoi 1320 khong dung duoc co che san co. Skill Level cung khong cuu
 * duoc: muc 0 van tuong duong khoang 1300-1400 Elo.
 *
 * Va o dai TREN 1320 thi do dac cho thay co che san co cung khong dung duoc: o
 * thoi gian nghi ngan, UCI_Elo bi nen nang, muc "1600" thuc chat chi ~1444.
 * Ket cuc: CA THANG dung mot co che tu viet (xem engine-move-selector.js).
 *
 * Y TUONG CUA CHE DO 'custom':
 * Nguoi moi khong danh "yeu deu". Ho danh phan lon hop ly roi thinh thoang cho
 * khong con Hau. Giam do sau tim kiem chi tao ra may danh NHAT QUAN o muc trung
 * binh — khong bao gio sai ngo ngan, cung khong bao gio hay. Cam giac nhu dau
 * robot cun. Nen mo phong dung hai tang:
 *   - `temp`    chon nuoc theo phan bo xac suat, nuoc kem hon cang nhieu diem thi
 *               cang it kha nang duoc chon. temp cao = de chon nuoc kem.
 *   - `blunder` xac suat CHU DONG chon nuoc te nhat trong danh sach ung vien.
 *               Day chinh la con Hau bi treo.
 *
 * CANH BAO: moi con so trong bang nay la PHONG DOAN BAN DAU, chua duoc do dac.
 * Phai chay tools/run-selfplay-matches.mjs de kiem chung thu tu suc manh truoc khi
 * tin vao con so Elo. Xem phase-03 trong plan.
 */

/* ============================================================================
 * BANG THAM SO NAY DUNG TU SO DO, KHONG PHAI TU PHONG DOAN
 *
 * Do bang 1.590 van doi khang (tools/run-selfplay-matches.mjs) + 600 van do moc
 * (tools/probe-depth-strength.mjs). Chi tiet: docs/cat-chess-elo-calibration.md
 *
 * BAI HOC LON NHAT — thiet ke ban dau sai o cho co ban:
 *   Em dung DO SAU TIM KIEM lam nut dieu chinh chinh. Do dac cho thay do sau gan
 *   nhu KHONG anh huong, con nhiet do + xac suat di ho moi la thu quyet dinh:
 *
 *     d4 · t60 · b06  ->  1643 Elo        d5 · t60 · b06  ->  1650 Elo
 *     (hon nhau mot tang do sau, chenh dung 7 Elo)
 *
 *     d4 · t90 · b11  ->  1344 Elo        d4 · t60 · b06  ->  1643 Elo
 *     (cung do sau, chi ha nhiet do 90->60, nhay +300 Elo)
 *
 *   Ly do: softmax tren danh sach MultiPV lan at ket qua tim kiem. Tim sau hon
 *   chi lam danh sach ung vien chinh xac hon, nhung neu van chon ngau nhien theo
 *   nhiet do cao thi khong khac gi may.
 *
 * CAC MOC DA DO (dung de noi suy khi can chinh lai):
 *   d1·t300·b45 =  317      d2·t160·b22 =  960      d4·t60·b06 = 1643
 *   d1·t250·b35 =  477      d3·t120·b16 = 1212      d4·t30·b02 = 1692
 *   d2·t200·b28 =  755      d4·t90·b11 = 1344       d6·t40·b03 = 1893
 *
 * CHOT CHAN DANG GIA ~74 Elo — do chenh giua co va khong co. Dung ha nguong
 * kich hoat cua chung neu khong muon thang bi xe dich. *
 * BAY THU HAI — MULTIPV QUYET DINH NHIET DO CO TAC DUNG HAY KHONG (do 22/08/2026):
 *   Nhiet do boc nuoc bang softmax TREN DANH SACH MultiPV. Danh sach HEP thi khong
 *   con nuoc kem de boc, va nhiet do gan nhu mat tac dung:
 *
 *     d4·mpv4·t84·b14  -> 1492        d4·mpv4·t60·b06 -> 1492    (TRUNG KHIT)
 *     d4·mpv5·t110·b14 -> 1271        (chi noi mpv 4->5, tut 221 Elo)
 *
 *   Lan them muc 1350 da dinh dung bay nay: dat mpv 4 giong het Dai Ka nen hai muc
 *   manh y nhau, do ra cung 70/96 diem. Muon lam yeu thi NOI RONG mpv TRUOC roi moi
 *   tang nhiet. Vi vay tu day moi moc phai ghi kem mpv — bang moc phia tren thieu no.
 *
 * MOC DO PHU THUOC MAY — dung so sanh so tuyet doi giua hai lan do khac nhau:
 *   Doi thu moc chay theo THOI GIAN (UCI_Elo 1320, 250ms) con ca thang chay theo DO
 *   SAU co dinh. May nhanh hon -> moc manh hon -> ca thang tut xuong. Do lai ngay
 *   22/08 tren may khac: d4·mpv4·t60·b06 ra 1492 chu khong phai 1643 (lech 151 Elo),
 *   va ca thang lech theo. So tuong doi TRONG CUNG mot lan do thi van dung.
 *   => Muc moi phai neo theo HAI HANG XOM do CUNG LAN, khong lay so cu ra so.
 * ============================================================================ */

CC.EloProfiles = (function () {
  /* Toan bo thang dung mot co che: tim theo do sau + softmax + di ho.
   *
   * Da BO che do 'native' (UCI_LimitStrength). Ly do tu so do: o thoi gian nghi
   * 250-400ms, UCI_Elo bi NEN nang — nhan cach nhau 130-150 nhung do ra chi chenh
   * 56-68 Elo, va muc "1600" thuc chat chi khoang 1444. No khong voi toi dinh thang
   * ma Anh dat ra, trong khi che do tu viet thi voi toi thoai mai.
   */
  /* TAM MUC — va moi muc deu la ket qua cua phep do, khong phai lua chon.
   *
   * Vong 2 (1.575 van) do duoc vi tri tuong doi cua 9 cau hinh:
   *   0 · 116 · 307 · 536 · 727 · 776 · 883 · 1169 · 1211  (Elo, tinh tu muc thap nhat)
   *
   * Hai cap dinh nhau: 727/776 va 1169/1211. Nguoi choi khong the phan biet duoc hai
   * muc chi cach nhau 42-49 Elo — chung chi lam thang dai ra chu khong them lua chon
   * nao. Da BO hai cau hinh thua, thay vi doan tham so moi chua qua do dac.
   *
   * CON SO `elo` DUOI DAY LA SO DO, KHONG PHAI SO CHO SAN.
   * Xac dinh bang HAI cach doc lap, va chung khop nhau:
   *   1. Chuoi cap lien ke  (1.575 van, run-selfplay-matches.mjs)
   *   2. Neo vao UCI_Elo 1320 (700 van, probe-depth-strength.mjs)
   *
   *   Cau hinh            Chuoi     Neo      Nhan chot
   *   d1·t275·b40          367       —         400
   *   d1·t210·b30          483       —         500
   *   d2·t215·b30          674       —         700
   *   d2·t180·b25          903       —         900
   *   d2·t150·b20         1094     1038       1050
   *   d3·t100·b12         1250     1250       1250
   *   d4·t60·b06            —      1643       1600   (ghi thap hon so do, cho chac)
   *
   * Muc 1350 them sau (22/08/2026), do o LAN KHAC nen phai doc theo cach khac:
   *
   *   Cau hinh            Do lan 22/08   Nhan chot
   *   d3·mpv5·t100·b12        1187         1250   <- But, moc duoi
   *   d4·mpv5·t110·b14        1271         1350   <- Bao
   *   d4·mpv4·t60·b06         1492         1600   <- Dai Ka, moc tren
   *
   * Nhan 1350 KHONG phai so do thang, ma la noi suy tuyen tinh giua hai hang xom
   * do cung lan: 1250 + (1271-1187)*(1600-1250)/(1492-1187) = 1346, lam tron 1350.
   * Phai lam vay vi moc do phu thuoc may (xem dau file). Sai so mau 64 van la
   * +/-44 Elo, nen dung coi 1350 la con so chinh xac — giao dien van ghi "khoang".
   *
   * Hai cach khop nhau ro nhat o hai dau: muc 1250 trung khit, va cau hinh
   * d4·t63·b065 cho 1578 (chuoi) so voi 1573 (neo). Do la kiem chung cheo that su.
   */
  const LEVELS = [
    { elo: 400,  name: 'Mèo sơ sinh',  mode: 'custom', depth: 1, multipv: 8, temp: 275, blunder: 0.40 },
    { elo: 500,  name: 'Mèo con',      mode: 'custom', depth: 1, multipv: 8, temp: 210, blunder: 0.30 },
    { elo: 700,  name: 'Mèo tập chơi', mode: 'custom', depth: 2, multipv: 6, temp: 215, blunder: 0.30 },
    { elo: 900,  name: 'Mèo hàng xóm', mode: 'custom', depth: 2, multipv: 6, temp: 180, blunder: 0.25 },
    { elo: 1050, name: 'Mèo tinh ranh',mode: 'custom', depth: 2, multipv: 5, temp: 150, blunder: 0.20 },
    { elo: 1250, name: 'Mèo lão luyện',mode: 'custom', depth: 3, multipv: 5, temp: 100, blunder: 0.12 },
    { elo: 1350, name: 'Mèo đi săn',   mode: 'custom', depth: 4, multipv: 5, temp: 110, blunder: 0.14 },
    { elo: 1600, name: 'Mèo đại sư',   mode: 'custom', depth: 4, multipv: 4, temp: 60,  blunder: 0.06 }
  ];

  /* --- Chot chan: ranh gioi giua "doi thu de" va "doi thu vo ly" ---
   *
   * Khong co may cai nay thi muc thap trong nhu PHAN MEM HONG chu khong phai
   * nguoi moi. Nguoi 1000 Elo khong bo lo chieu bi lo lieu; khong ai ngo lo con
   * Hau dung tro ra giua ban.
   *
   * Chay SAU bo chon nuoc, dang bo loc phu quyet.
   */
  const GUARDS = {
    /* Thay chieu het trong 1 nuoc thi phai di */
    mateIn1From: 1000,
    /* Quan dich de khong ma an duoc thi phai an (tru khi an xong mat nhieu hon) */
    takeHangingFrom: 850,
    /* Dang thang to thi khong duoc di vao pat — moi muc deu ap dung */
    avoidStalemateAlways: true,
    /* Dang thang thi khong lap nuoc 3 lan — moi muc deu ap dung */
    avoidRepetitionAlways: true,
    /* "Thang to" nghia la hon bao nhieu diem quan */
    winningMargin: 800   // phan tram con tot, tuong duong ~8 diem quan
  };

  return {
    LEVELS,
    GUARDS,

    /* Muc gan nhat voi mot con so Elo bat ky */
    byElo(elo) {
      let best = LEVELS[0];
      let d = Infinity;
      LEVELS.forEach(l => {
        const dist = Math.abs(l.elo - elo);
        if (dist < d) { d = dist; best = l; }
      });
      return best;
    },

    /* Giong noi KHONG con o day — moi muc la mot nhan vat rieng, xem
     * data-cat-profiles.js (truong `voice`). De o hai cho la hai nguon su that. */

    min: () => LEVELS[0].elo,
    max: () => LEVELS[LEVELS.length - 1].elo
  };
})();

;
/* ===== js/engine-move-selector.js ===== */
/* engine-move-selector.js — chon nuoc di cho meo o che do 'custom'
 *
 * Dau vao: danh sach ung vien MultiPV tu Stockfish, moi cai co diem so.
 * Dau ra: mot nuoc di — khong nhat thiet la nuoc tot nhat.
 *
 * Hai tang lam yeu (xem giai thich day du o engine-elo-profiles.js):
 *   1. softmax theo `temp`  — chon theo phan bo xac suat, nuoc kem van co cua
 *   2. `blunder`            — xac suat chu dong chon nuoc te nhat
 *
 * Luu y ve dau diem so: Stockfish tra diem theo goc nhin BEN DANG DI, ma game
 * luon hoi o luot cua meo, nen diem cang CAO cang tot cho meo. Khong lat dau.
 */

CC.MoveSelector = (function () {
  /* Chon theo phan bo softmax tren do THIET HAI so voi nuoc tot nhat.
   *
   *   loss_i  = diem_tot_nhat - diem_nuoc_i     (>= 0)
   *   trong_so_i = exp(-loss_i / temp)
   *
   * temp nho  -> gan nhu luon lay nuoc tot nhat
   * temp lon  -> cac nuoc gan ngang nhau ve co hoi
   */
  function softmaxPick(lines, temp) {
    if (lines.length === 1) return lines[0];

    const best = lines[0].score;
    const weights = lines.map(l => {
      const loss = best - l.score;
      // Chan mu tran/duoi: loss rat lon cho ra 0, tinh ra NaN thi hong ca ham
      const e = Math.exp(-Math.min(loss, 100000) / Math.max(temp, 1));
      return isFinite(e) ? e : 0;
    });

    return CC.util.pickWeighted(lines, weights);
  }

  return {
    /* lines: [{move, score, depth, mate, pv}] da sap xep tot -> kem
     * profile: mot phan tu cua CC.EloProfiles.LEVELS
     *
     * Tra ve {move, wasBlunder} — `wasBlunder` de he thong chat cho meo noi mot
     * cau bien loi thanh tinh cach ("Ơ... em nhấn nhầm rồi").
     */
    pick(lines, profile) {
      if (!lines || !lines.length) return null;
      if (lines.length === 1) return { move: lines[0].move, wasBlunder: false };

      // Chu dong di ho theo xac suat: lay nuoc TE NHAT trong danh sach ung vien
      if (Math.random() < profile.blunder) {
        const worst = lines[lines.length - 1];
        // Chi tinh la "di ho" khi that su kem han nuoc tot nhat. Neu moi nuoc deu
        // ngang nhau (vi du chi con mot nuoc bat buoc) thi khong phai loi.
        const gap = lines[0].score - worst.score;
        return { move: worst.move, wasBlunder: gap > 100 };
      }

      const chosen = softmaxPick(lines, profile.temp);
      return { move: chosen.move, wasBlunder: false };
    },

    /* Danh gia chat luong mot nuoc NGUOI CHOI vua di, dung cho he thong chat.
     * bestScore / playedScore deu theo goc nhin nguoi choi.
     *
     * Nguong lay theo cach cham quen thuoc cua cac trang co truc tuyen.
     */
    gradeMove(bestScore, playedScore) {
      const loss = bestScore - playedScore;
      if (loss <= 10) return 'best';        // dung nuoc may chon
      if (loss <= 50) return 'good';
      if (loss <= 120) return 'ok';
      if (loss <= 300) return 'inaccuracy'; // thieu chinh xac
      if (loss <= 600) return 'mistake';    // sai lam
      return 'blunder';                     // di ho nang
    }
  };
})();

;
/* ===== js/engine-safety-guards.js ===== */
/* engine-safety-guards.js — bon chot chan sau khi da chon nuoc
 *
 * DAY LA RANH GIOI GIUA "DOI THU DE" VA "DOI THU VO LY".
 *
 * Khong co may cai nay, muc Elo thap trong nhu PHAN MEM HONG chu khong phai nguoi
 * moi choi. Nguoi 1000 Elo khong bo lo chieu bi lo lieu. Khong ai ngo lo con Hau
 * dung tro ra giua ban. Va khong gi lam hong van co bang viec dang thang to thi
 * doi thu tu di vao pat.
 *
 * Chay SAU bo chon nuoc, dang bo loc phu quyet: nuoc da chon vi pham thi thay
 * bang nuoc hop le gan nhat.
 *
 * DEM SO LAN KICH HOAT: neu chot chan ban qua ~15% so nuoc thi nguong dat sai —
 * luc do phan lam yeu bi vo hieu hoa va moi muc Elo se danh gan nhu nhau.
 */

CC.SafetyGuards = (function () {
  const G = CC.EloProfiles.GUARDS;

  /* Thong ke de kiem tra nguong, doc bang CC.SafetyGuards.stats() */
  const stats = { total: 0, mate: 0, hanging: 0, stalemate: 0, repetition: 0 };

  /* Chot 1 — thay chieu het trong 1 nuoc thi phai di.
   * Tinh truc tiep tren ban nhap thay vi tin vao diem `mate` cua engine, vi o
   * do sau 1 engine co the chua kip bao.
   */
  function findMateIn1(sc, legal) {
    for (const uci of legal) {
      const p = sc.probe(uci);
      if (p.ok && p.checkmate) return uci;
    }
    return null;
  }

  /* Chot 2 — quan de khong ma an duoc thi phai an.
   *
   * Cach uoc luong loi/lo mot nuoc an quan:
   *   an duoc X, o dich KHONG bi an lai  -> loi = gia tri X
   *   an duoc X, o dich BI an lai        -> loi = gia tri X - gia tri quan minh
   *
   * Day la uoc luong tho (khong phai SEE day du), nhung du de bat truong hop
   * "con Hau dung tro ra" — dung muc dich cua chot nay.
   */
  function bestFreeCapture(sc) {
    let best = null, bestGain = 0;
    for (const m of sc.movesVerbose()) {
      if (!m.captured) continue;
      const uci = m.from + m.to + (m.promotion || '');
      const p = sc.probe(uci);
      if (!p.ok) continue;
      const gain = CC.Rules.VALUE[m.captured] - (p.attacked ? CC.Rules.VALUE[m.piece] : 0);
      if (gain > bestGain) { bestGain = gain; best = uci; }
    }
    return { uci: best, gain: bestGain };
  }

  /* Gia tri loi/lo cua mot nuoc cu the — de so voi nuoc tot nhat */
  function gainOf(sc, uci) {
    const p = sc.probe(uci);
    if (!p.ok || !p.captured) return 0;
    const from = uci.slice(0, 2);
    const mv = sc.movesVerbose().find(m => m.from === from && m.to === uci.slice(2, 4));
    if (!mv) return 0;
    return CC.Rules.VALUE[p.captured] - (p.attacked ? CC.Rules.VALUE[mv.piece] : 0);
  }

  return {
    stats: () => Object.assign({}, stats),
    resetStats() { Object.keys(stats).forEach(k => { stats[k] = 0; }); },

    /* Ap dung cac chot chan.
     *
     * fen     the co truoc khi di
     * chosen  nuoc bo chon nuoc da chon
     * profile muc Elo dang choi
     *
     * Tra ve {move, overridden, reason}
     */
    apply(fen, chosen, profile) {
      stats.total++;
      const sc = CC.Rules.scratch(fen);
      const legal = sc.movesUci();
      if (!legal.length) return { move: chosen, overridden: false };
      if (legal.length === 1) return { move: legal[0], overridden: false };

      const elo = profile.elo;

      /* --- Chot 1: chieu het trong 1 nuoc --- */
      if (elo >= G.mateIn1From) {
        const mate = findMateIn1(sc, legal);
        if (mate && mate !== chosen) {
          stats.mate++;
          return { move: mate, overridden: true, reason: 'mate-in-1' };
        }
      }

      /* --- Chot 2: an quan cho khong --- */
      if (elo >= G.takeHangingFrom) {
        const free = bestFreeCapture(sc);
        // Chi can thiep khi mon loi la dang ke (tu mot quan nhe tro len)
        if (free.uci && free.gain >= 3 && free.uci !== chosen) {
          if (gainOf(sc, chosen) < free.gain) {
            stats.hanging++;
            return { move: free.uci, overridden: true, reason: 'hanging-piece' };
          }
        }
      }

      /* --- Chot 3 & 4: dang thang to thi khong pat, khong lap nuoc --- */
      const winningBig = sc.materialForSideToMove() * 100 >= G.winningMargin;
      if (winningBig) {
        const p = sc.probe(chosen);

        const badStalemate = G.avoidStalemateAlways && p.ok && p.stalemate;
        const badRepeat = G.avoidRepetitionAlways && p.ok && p.threefold;

        if (badStalemate || badRepeat) {
          // Tim nuoc thay the khong dinh loi do
          const alt = legal.find(u => {
            if (u === chosen) return false;
            const q = sc.probe(u);
            return q.ok && !q.stalemate && !q.threefold;
          });
          if (alt) {
            if (badStalemate) stats.stalemate++; else stats.repetition++;
            return { move: alt, overridden: true, reason: badStalemate ? 'stalemate' : 'repetition' };
          }
        }
      }

      return { move: chosen, overridden: false };
    }
  };
})();

;
/* ===== js/engine-lifecycle.js ===== */
/* engine-lifecycle.js — mat tien cua phan engine
 *
 * Phan con lai cua game chi goi qua day: pickMove / evaluate / hint.
 *
 * Hai viec file nay lo:
 *   1. NAP LUOI — trang hien ngay, engine tai o nen. Nguoi choi di truoc khi engine
 *      xong thi meo hien "dang ngu day..." roi di ngay khi san sang.
 *   2. DO TRE GIA — engine tra loi trong ~30ms. Dap tra tuc thi lam mat het cam giac
 *      "doi thu dang nghi", va muc Elo 400 se trong nhu may chu khong nhu nguoi moi.
 *
 * Viec noi tiep cac luot tim kiem KHONG nam o day — no da duoc EngineBridge lo,
 * vi rang buoc "mot Worker mot luot" thuoc ve chinh bridge. Dat o hai noi la thua.
 */

CC.Engine = (function () {
  let bootState = 'idle';          // idle | loading | ready | failed
  let bootError = null;

  /* Do tre gia: the co cang roi thi meo cang nghi lau, va muc cang cao cang lau.
   * Muc dich la trong nhu dang suy nghi that, khong phai lam cham cho co.
   */
  function thinkDelay(profile, legalCount, inCheck) {
    const c = CC.cfg;
    let t = c.THINK_MIN;
    t += Math.min(legalCount, 40) / 40 * 500;             // nhieu lua chon -> nghi lau
    t += (profile.elo / CC.EloProfiles.max()) * 600;      // muc cao -> nghi lau
    if (inCheck) t += 300;                                // bi chieu -> can than hon
    t += CC.util.randInt(-150, 250);                      // khong deu tam tap
    return CC.util.clamp(t, c.THINK_MIN, c.THINK_MAX);
  }

  const api = {
    bootState: () => bootState,
    bootError: () => bootError,

    /* Nap engine o nen. An toan khi goi nhieu lan. */
    warmUp() {
      if (bootState === 'ready' || bootState === 'loading') return;
      bootState = 'loading';
      bootError = null;
      CC.util.bus.emit('engine:loading', {});

      CC.EngineBridge.boot()
        .then(() => {
          bootState = 'ready';
          CC.util.bus.emit('engine:ready', {});
        })
        .catch(err => {
          bootState = 'failed';
          bootError = err;
          console.error('[engine] nap that bai:', err);
          CC.util.bus.emit('engine:failed', { error: err });
        });
    },

    /* Thu nap lai sau khi that bai */
    retry() {
      CC.EngineBridge.dispose();
      bootState = 'idle';
      api.warmUp();
    },

    /* Chon nuoc di cho meo.
     * opts: {fen, elo, legal}
     * Tra ve chuoi UCI, hoac null neu that bai.
     */
    async pickMove(opts) {
      const profile = CC.EloProfiles.byElo(opts.elo);
      const started = Date.now();

      try {
        {
          const sc = CC.Rules.scratch(opts.fen);
          const legal = opts.legal || sc.movesUci();
          if (!legal.length) return null;

          let move, wasBlunder = false;

          if (profile.mode === 'native') {
            /* 1320-1600: dung co che san co cua Stockfish, dang tin nhat.
             * 1320 la gia tri THAP NHAT ma UCI_Elo nhan — do la ly do ranh gioi
             * giua hai che do nam dung o day. */
            const res = await CC.EngineBridge.search({
              fen: opts.fen,
              movetime: profile.movetime,
              multipv: 1,
              limitStrength: true,
              elo: profile.elo
            });
            move = res.best || (res.lines[0] && res.lines[0].move);
          } else {
            /* 400-1150: tu chon nuoc yeu */
            const res = await CC.EngineBridge.search({
              fen: opts.fen,
              depth: profile.depth,
              multipv: profile.multipv
            });

            if (!res.lines.length) {
              move = res.best;
            } else {
              const picked = CC.MoveSelector.pick(res.lines, profile);
              move = picked.move;
              wasBlunder = picked.wasBlunder;
            }
          }

          if (!move) return null;

          /* Chot chan chay o CA HAI che do — muc 1600 cung khong duoc di vao pat
           * khi dang thang to.
           */
          const guarded = CC.SafetyGuards.apply(opts.fen, move, profile);
          if (guarded.overridden) {
            wasBlunder = false;   // da bi chan lai thi khong con la nuoc ho
            CC.util.bus.emit('engine:guard', { reason: guarded.reason });
          }

          // Nuoc cuoi cung van phai hop le — chan moi truong hop bat ngo
          if (legal.indexOf(guarded.move) < 0) {
            console.warn('[engine] nuoc chon khong hop le:', guarded.move, '-> lay nuoc dau tien');
            return legal[0];
          }

          CC.util.bus.emit('engine:picked', { move: guarded.move, wasBlunder, elo: profile.elo });

          // Bu cho du do tre gia (tru thoi gian engine da that su ton)
          const wait = thinkDelay(profile, legal.length, sc.inCheck()) - (Date.now() - started);
          if (wait > 0) await CC.util.sleep(wait);

          return guarded.move;
        }
      } catch (err) {
        console.error('[engine] pickMove that bai:', err);
        CC.util.bus.emit('engine:failed', { error: err });
        // Van phai di mot nuoc, khong duoc de ket luot: lay nuoc hop le bat ky
        const legal = opts.legal || [];
        return legal.length ? CC.util.pick(legal) : null;
      }
    },

    /* Danh gia mot the co o do sau co dinh, theo goc nhin BEN DANG DI.
     * Dung do sau co dinh (khong theo muc Elo) de he thong chat cham nuoc di
     * nhat quan — cham bang engine yeu thi loi khen che se troi noi.
     */
    async evaluate(fen, depth) {
      try {
        const res = await CC.EngineBridge.search({ fen, depth: depth || 8, multipv: 1 });
        const top = res.lines[0];
        return top ? { score: top.score, best: top.move, mate: top.mate, pv: top.pv } : null;
      } catch (err) {
        console.warn('[engine] evaluate that bai:', err.message);
        return null;
      }
    },

    /* Goi y nuoc di cho nguoi choi — do sau cao hon vi day la loi khuyen that */
    hint(fen) {
      return api.evaluate(fen, 12);
    },

    dispose() {
      CC.EngineBridge.dispose();
      bootState = 'idle';
    }
  };

  return api;
})();

;
/* ===== js/scoring-cat-points.js ===== */
/* scoring-cat-points.js — tinh thanh tich cho bang xep hang
 *
 * Co vua khong co "man choi" nhu game ban ga, nen tieu chi xep hang phai nghi lai:
 *
 *   bestEloBeaten  muc cao nhat tung THANG  — thuoc do tu nhien nhat, ai cung co so
 *   catPoints      thang muc nao cong diem muc do, hoa duoc mot nua
 *                  -> thuong ca nguoi choi BEN, khong chi nguoi choi GIOI
 *   bestStreak     chuoi thang dai nhat     — vui, de khoe, tao ly do choi tiep
 *
 * VAN 2 NGUOI CHUNG MAY KHONG TINH DIEM. game-flow chi goi vao day o che do 'ai'.
 */

CC.Scoring = (function () {
  const api = {
    /* Ghi ket qua mot van. outcome theo goc nhin NGUOI CHOI: win|loss|draw */
    recordGame(elo, outcome) {
      const s = CC.Store.score();

      s.totalGames = (s.totalGames || 0) + 1;

      if (outcome === 'win') {
        s.catPoints = (s.catPoints || 0) + elo;
        s.bestEloBeaten = Math.max(s.bestEloBeaten || 0, elo);
        s.streak = (s.streak || 0) + 1;
        s.bestStreak = Math.max(s.bestStreak || 0, s.streak);
      } else if (outcome === 'draw') {
        s.catPoints = (s.catPoints || 0) + Math.round(elo / 2);
        s.streak = 0;
      } else {
        s.streak = 0;
      }

      CC.Store.setScore(s);
      CC.util.bus.emit('score:changed', s);

      // Phase 08 se nghe su kien nay de day len dam may
      return s;
    },

    /* Tong ket de hien o man ho so */
    summary() {
      const s = CC.Store.score();
      const rec = CC.Store.record();

      let w = 0, l = 0, d = 0;
      Object.keys(rec).forEach(k => { w += rec[k].w; l += rec[k].l; d += rec[k].d; });

      return {
        bestEloBeaten: s.bestEloBeaten || 0,
        catPoints: s.catPoints || 0,
        bestStreak: s.bestStreak || 0,
        streak: s.streak || 0,
        totalGames: s.totalGames || 0,
        wins: w, losses: l, draws: d,
        byElo: rec
      };
    },

    /* Muc tiep theo nen thu — dung de goi y o man chon muc.
     * Thang 3 van tro len o mot muc thi khuyen len muc cao hon.
     */
    suggestedElo() {
      const rec = CC.Store.record();
      const levels = CC.EloProfiles.LEVELS;
      for (let i = 0; i < levels.length; i++) {
        const r = rec[String(levels[i].elo)];
        if (!r || r.w < 3) return levels[i].elo;
      }
      return levels[levels.length - 1].elo;
    }
  };

  return api;
})();

;
/* ===== js/cloud-adapter.js ===== */
/* cloud-adapter.js — cờ vua nói cho mã dùng chung biết DỮ LIỆU CỦA NÓ hình dạng thế nào
 *
 * Phần mạng (phiên, hạn giờ, gom lần ghi, hàng đợi khi mất mạng) do `shared/portal-cloud.js`
 * lo. File này chỉ khai báo thứ thuộc riêng cờ vua.
 *
 * Trước đây cờ vua có bản sao riêng của cả ba file đăng nhập. Giờ chỉ còn file này —
 * ~70 dòng thay vì ~340.
 */

CC.CloudAdapter = (function () {
  /* Điểm để so hai bản tiến độ. `catPoints` chỉ tăng nên bản cao hơn là bản mới hơn. */
  function weight(p) {
    if (!p || !p.score) return -1;
    return (p.score.catPoints || 0);
  }

  /* Máy này chưa chơi ván nào.
   * Phải xét riêng chứ không dựa vào `weight`: hồ sơ mới tinh vẫn có catPoints = 0,
   * mà 0 cũng là điểm hợp lệ của người đã chơi mà chưa thắng ván nào. */
  function isEmpty(p) {
    return !p || !p.score || !(p.score.totalGames > 0);
  }

  return {
    init() {
      /* Nối thông báo của mã chung vào kiểu thông báo của game.
       * Gán TRƯỚC init: `adopt` bên dưới gọi Portal.toast, mà mã chung có thể
       * chạy adopt ngay khi biết phiên đăng nhập cũ. */
      Portal.toast = text => CC.util.bus.emit('ui:toast', { text });

      Portal.Cloud.init({
        game: 'chess',
        userDoc: 'chessUsers',
        scoreDoc: 'chessScores',

        /* Tiến độ đầy đủ — ghi vào chessUsers */
        progress: () => ({
          score: CC.Store.score(),
          record: CC.Store.record(),
          prefs: CC.Store.prefs()
        }),

        /* Các trường dùng để xếp hạng — ghi vào chessScores.
         * Chỉ những trường này mới lên bảng công khai. */
        score: () => {
          const s = CC.Store.score();
          return {
            bestEloBeaten: s.bestEloBeaten || 0,
            catPoints: s.catPoints || 0,
            bestStreak: s.bestStreak || 0,
            totalGames: s.totalGames || 0
          };
        },

        /* Cờ vua chỉ có một hồ sơ mỗi tài khoản nên lấy thẳng tên Google.
         * (Sky Chicken khác: một tài khoản có 3 hồ sơ phi công, xem adapter bên đó.) */
        playerName: () => (Portal.Auth.user && Portal.Auth.user.name) || 'Kỳ thủ',

        weight,
        isEmpty,

        /* Nhận tiến độ từ đám mây về máy */
        adopt(cloud) {
          if (cloud.score) CC.Store.setScore(cloud.score);
          if (cloud.record) {
            try { localStorage.setItem(CC.cfg.LS.RECORD, JSON.stringify(cloud.record)); }
            catch (e) { /* localStorage bị tắt — không sao, vẫn chơi được */ }
          }
          CC.util.bus.emit('cloud:pulled', {});
          Portal.toast('Đã tải thành tích về');
        },

        /* Xung đột thì HỎI, không tự ghi đè.
         * Người chơi cày ở máy khác rồi về máy này — tự đè là mất thành tích của họ. */
        askMerge(local, cloud) {
          const l = (local.score && local.score.catPoints) || 0;
          const c = (cloud.score && cloud.score.catPoints) || 0;
          return new Promise(resolve => {
            const ok = confirm(
              'Tài khoản của Anh có thành tích cao hơn ở máy khác:\n\n' +
              '  Trên máy này: ' + l.toLocaleString('vi-VN') + ' điểm mèo\n' +
              '  Trên tài khoản: ' + c.toLocaleString('vi-VN') + ' điểm mèo\n\n' +
              'Lấy thành tích trên tài khoản về máy này?');
            resolve(ok ? 'cloud' : 'local');
          });
        }
      });

      /* Ghi lên đám mây khi KẾT THÚC MỘT VÁN, không ghi theo từng nước —
       * vừa tốn hạn mức vừa vô nghĩa.
       *
       * VÁN 2 NGƯỜI CHUNG MÁY KHÔNG BAO GIỜ ĐƯỢC GHI. `scoring-cat-points.js` đã
       * chặn ở trên (không cộng điểm nên không phát `score:changed`), đây là lớp
       * thứ hai. Bản cũ có ghi trong chú thích rằng nó là "lớp thứ hai" nhưng mã
       * thì không kiểm gì cả — chỉ cần một chỗ nào đó lỡ phát `score:changed`
       * giữa ván hotseat là điểm đánh với người ngồi cạnh lên bảng xếp hạng. */
      CC.util.bus.on('score:changed', () => {
        if (CC.Game.state && CC.Game.state.mode === 'hotseat') return;
        Portal.Cloud.markDirty();
      });

      /* Hạ ngay một bản tóm tắt cho trang hồ sơ `/game/me/`. Không có dòng này thì
       * người đã chơi từ trước bản cập nhật phải chơi thêm một ván nữa mới thấy hồ sơ. */
      Portal.Cloud.snapshotLocal();

      return this;
    }
  };
})();

;
/* ===== js/game-persistence.js ===== */
/* game-persistence.js — luu va khoi phuc van dang choi
 *
 * Tach khoi game-flow.js vi day la mot moi quan tam RIENG BIET: game-flow lo vong
 * luot, file nay lo "dong tab giua chung thi khong mat van".
 *
 * VI SAO LUU DANH SACH NUOC DI CHU KHONG CHI FEN:
 * FEN chi ta the co hien tai. Luu FEN thi mo lai se mat lich su -> khong di lai
 * duoc, va he thong chat khong doc lai duoc dien bien. Phat lai tu danh sach nuoc
 * di thi giu duoc tat ca, doi lai ton vai mili giay luc mo — qua re.
 */

CC.Persistence = (function () {
  return {
    /* Chup trang thai hien tai thanh object de ghi xuong localStorage */
    snapshot(st) {
      return {
        mode: st.mode,
        elo: st.elo,
        playerColor: st.playerColor,
        moves: CC.Rules.historyUci(),
        hintsUsed: st.hintsUsed,
        savedAt: Date.now()
      };
    },

    /* Doc van da luu va do nguoc vao `st`. Tra ve false neu khong khoi phuc duoc.
     *
     * Chi dung toi phan DU LIEU; phan ve lai giao dien va tiep tuc vong luot van
     * do game-flow lo, vi do la viec cua no.
     */
    apply(st) {
      const s = CC.Store.loadGame();
      if (!s || !s.moves || !s.moves.length) return false;

      // Phat lai tung nuoc. Du lieu hong (doi phien ban, sua tay) thi bo han.
      if (!CC.Rules.loadHistory(s.moves)) return false;

      st.mode = s.mode || 'ai';
      st.elo = s.elo || 700;
      st.playerColor = s.playerColor || 'w';
      st.hintsUsed = s.hintsUsed || 0;
      st.over = false;
      st.busy = false;
      st.thinking = false;
      return true;
    },

    /* Huong ban co khi khoi phuc — khac nhau giua hai che do choi */
    flipFor(st) {
      if (st.mode === 'hotseat') {
        return CC.Store.prefs().autoFlip && CC.Rules.turn() === 'b';
      }
      return st.playerColor === 'b';
    }
  };
})();

;
/* ===== js/game-flow.js ===== */
/* game-flow.js — dieu phoi mot van co
 *
 * Day la trung tam: no giu trang thai van, quyet dinh den luot ai, goi engine,
 * va phat su kien cho cac he thong khac (meo, chat, giao dien) nghe theo.
 *
 * Nguyen tac: cac he thong khac KHONG goi nguoc vao day de doi trang thai.
 * Chung chi nghe su kien. Nho vay them tinh nang moi khong lam roi vong luot.
 *
 * Su kien phat ra tren CC.util.bus:
 *   game:start     {mode, elo, playerColor}
 *   game:move      {move, byPlayer, san, uci}
 *   game:turn      {turn, isPlayerTurn}
 *   game:thinking  {on}
 *   game:over      {result, outcome}
 *   game:restored  {}
 */

CC.Game = (function () {
  const st = {
    mode: 'ai',            // 'ai' | 'hotseat'
    elo: 700,
    playerColor: 'w',      // mau nguoi choi cam (che do 'ai')
    over: false,
    thinking: false,
    hintsUsed: 0,
    busy: false            // dang xu ly mot nuoc di, chan bam trung
  };

  /* --- truy van --- */

  function isPlayerTurn() {
    if (st.over) return false;
    if (st.mode === 'hotseat') return true;      // ca hai ben deu la nguoi
    return CC.Rules.turn() === st.playerColor;
  }

  /* Nguoi choi co duoc phep cam quan o o nay khong */
  function canMove(square) {
    if (st.over || st.busy || !isPlayerTurn()) return false;
    const p = CC.Rules.pieces().find(x => x.square === square);
    return !!p && p.color === CC.Rules.turn();
  }

  /* --- ve giao dien theo the co --- */

  function refresh(moved) {
    CC.Board.sync(moved ? { moved } : null);
    CC.Highlight.setCheck(CC.Rules.inCheck() ? CC.Rules.kingSquare(CC.Rules.turn()) : null);
    CC.util.bus.emit('game:turn', { turn: CC.Rules.turn(), isPlayerTurn: isPlayerTurn() });
  }

  /* --- ket thuc van --- */

  function checkOver() {
    const res = CC.Rules.result();
    if (!res.over) return false;

    st.over = true;
    CC.Interaction.setEnabled(false);

    // outcome tinh theo goc nhin nguoi choi (che do 'ai')
    let outcome = 'draw';
    if (res.winner) outcome = (res.winner === st.playerColor) ? 'win' : 'loss';

    if (st.mode === 'ai') {
      CC.Store.addResult(st.elo, outcome);
      if (CC.Scoring) CC.Scoring.recordGame(st.elo, outcome);
    }
    CC.Store.clearGame();
    CC.util.bus.emit('game:over', { result: res, outcome, mode: st.mode });
    return true;
  }

  /* --- thuc hien mot nuoc di --- */

  async function applyMove(from, to, promotion, byPlayer) {
    const mv = CC.Rules.move({ from, to, promotion });
    if (!mv) return null;

    refresh({ from, to });
    CC.Highlight.setLastMove(mv);
    CC.util.bus.emit('game:move', { move: mv, byPlayer, san: mv.san, uci: mv.uci });
    save();
    return mv;
  }

  /* --- luot cua meo --- */

  async function catTurn() {
    if (st.over || st.mode !== 'ai') return;

    st.thinking = true;
    st.busy = true;
    CC.Interaction.setEnabled(false);
    CC.util.bus.emit('game:thinking', { on: true });

    try {
      const uci = await CC.Engine.pickMove({
        fen: CC.Rules.fen(),
        elo: st.elo,
        legal: CC.Rules.allUci()
      });

      if (st.over) return;                     // nguoi choi da bat dau van moi giua chung

      if (!uci) {
        // Engine hong that su — bao ro thay vi de treo luot
        CC.util.bus.emit('game:engine-failed', {});
        return;
      }

      await applyMove(uci.slice(0, 2), uci.slice(2, 4), uci.slice(4) || undefined, false);
      checkOver();
    } finally {
      st.thinking = false;
      st.busy = false;
      CC.util.bus.emit('game:thinking', { on: false });
      if (!st.over) CC.Interaction.setEnabled(true);
    }
  }

  /* --- luu / khoi phuc --- */

  function save() {
    if (st.over) return;
    CC.Store.saveGame(CC.Persistence.snapshot(st));
  }

  const api = {
    state: st,
    isPlayerTurn,
    canMove,

    /* Bat dau van moi. opts: {mode, elo, playerColor} */
    start(opts) {
      opts = opts || {};
      st.mode = opts.mode || 'ai';
      st.elo = opts.elo || CC.Store.prefs().elo;
      st.playerColor = opts.playerColor || 'w';
      st.over = false;
      st.thinking = false;
      st.hintsUsed = 0;
      st.busy = false;

      CC.Rules.newGame();
      CC.Board.clearPieces();
      CC.Highlight.clearAll();
      CC.Board.setFlipped(st.mode === 'ai' && st.playerColor === 'b');
      refresh();
      CC.Interaction.setEnabled(true);
      CC.Store.clearGame();

      CC.util.bus.emit('game:start', { mode: st.mode, elo: st.elo, playerColor: st.playerColor });

      // Nguoi choi cam Den thi meo di truoc
      if (st.mode === 'ai' && st.playerColor === 'b') catTurn();
      return api;
    },

    /* Khoi phuc van da luu. Tra ve false neu khong co gi de khoi phuc.
     * Phan doc du lieu do CC.Persistence lo; day chi ve lai va tiep tuc vong luot.
     */
    restore() {
      if (!CC.Persistence.apply(st)) return false;

      CC.Board.clearPieces();
      CC.Highlight.clearAll();
      CC.Board.setFlipped(CC.Persistence.flipFor(st));
      refresh();

      const hist = CC.Rules.historyVerbose();
      if (hist.length) CC.Highlight.setLastMove(hist[hist.length - 1]);

      CC.Interaction.setEnabled(true);
      CC.util.bus.emit('game:restored', { mode: st.mode, elo: st.elo });
      CC.util.bus.emit('game:start', { mode: st.mode, elo: st.elo, playerColor: st.playerColor, restored: true });

      if (checkOver()) return true;
      // Luu giua luc meo dang nghi — cho no di tiep
      if (st.mode === 'ai' && !isPlayerTurn()) catTurn();
      return true;
    },

    /* Nguoi choi di mot nuoc. Lo luon phan hoi hop phong cap.
     *
     * CAN THAN VOI `busy`: moi duong ra khoi ham deu phai tra lai trang thai dung.
     * Ban dau viet kieu `if (!mv) return` trong try, va nhanh do KHONG duoc `finally`
     * xu ly — nuoc di bi tu choi la game KHOA CUNG vinh vien, khong con bam duoc gi.
     * Nen bay gio viet tuong minh: chi DUY NHAT nhanh "da di xong o che do dau voi
     * meo" moi de nguyen khoa, vi catTurn() se mo lai.
     */
    async playerMove(from, to) {
      if (st.busy || !canMove(from)) return;
      st.busy = true;
      CC.Interaction.setEnabled(false);

      /* Mo khoa va cho nguoi choi bam tiep */
      const release = () => {
        st.busy = false;
        if (!st.over) CC.Interaction.setEnabled(true);
      };

      let mv = null;
      try {
        let promotion;
        if (CC.Rules.isPromotion(from, to)) {
          promotion = await CC.Promotion.ask(CC.Rules.turn());
        }
        mv = await applyMove(from, to, promotion, true);
      } catch (err) {
        console.error('[game] nuoc di that bai:', err);
      }

      // Nuoc bi tu choi (khong hop le, hoac loi giua chung) -> tra lai quyen dieu khien
      if (!mv) { release(); return; }

      if (checkOver()) { st.busy = false; return; }

      if (st.mode === 'ai') {
        // catTurn() tu quan ly khoa: no khoa luc nghi va mo lai khi di xong
        st.busy = false;
        catTurn();
        return;
      }

      release();   // che do 2 nguoi: den luot nguoi kia, mo khoa ngay
    },

    /* Di lai. Che do 'ai' lui hai nuoc de ve dung luot nguoi choi. */
    undo() {
      if (st.thinking || st.over) return false;
      const n = st.mode === 'ai' ? 2 : 1;
      let done = 0;
      for (let i = 0; i < n; i++) { if (CC.Rules.undo()) done++; }
      if (!done) return false;

      CC.Board.clearPieces();
      CC.Highlight.clearAll();
      refresh();
      const hist = CC.Rules.historyVerbose();
      if (hist.length) CC.Highlight.setLastMove(hist[hist.length - 1]);
      CC.Interaction.setEnabled(true);
      save();
      CC.util.bus.emit('game:undo', { count: done });
      return true;
    },

    /* Xin thua — chi co nghia o che do dau voi meo */
    resign() {
      if (st.over) return;
      st.over = true;
      CC.Interaction.setEnabled(false);
      if (st.mode === 'ai') {
        CC.Store.addResult(st.elo, 'loss');
        if (CC.Scoring) CC.Scoring.recordGame(st.elo, 'loss');
      }
      CC.Store.clearGame();
      CC.util.bus.emit('game:over', {
        result: { over: true, winner: st.playerColor === 'w' ? 'b' : 'w', kind: 'resign', label: 'Xin thua' },
        outcome: 'loss', mode: st.mode
      });
    },

    flip() {
      CC.Board.setFlipped(!CC.Board.isFlipped());
    },

    save,
    refresh
  };

  return api;
})();

;
/* ===== js/game-mode-hotseat.js ===== */
/* game-mode-hotseat.js — che do 2 nguoi choi chung mot may
 *
 * Viec duy nhat cua file nay: tu lat ban theo luot, de nguoi dang di luon nhin
 * ban co tu phia minh. Khong dung vao vong luot cua game-flow — chi nghe su kien.
 *
 * Co tat duoc (tuy chon `autoFlip`): mot so nguoi thich giu nguyen huong ban,
 * nhat la khi hai nguoi ngoi canh nhau thay vi doi dien.
 */

CC.Hotseat = (function () {
  function active() {
    return CC.Game.state.mode === 'hotseat';
  }

  function applyFlip() {
    if (!active()) return;
    if (!CC.Store.prefs().autoFlip) return;
    // Cho hieu ung truot quan chay xong roi moi lat, khong thi hai chuyen dong
    // chong len nhau nhin rat roi
    setTimeout(() => {
      if (active()) CC.Board.setFlipped(CC.Rules.turn() === 'b');
    }, CC.cfg.MOVE_ANIM + 60);
  }

  return {
    init() {
      CC.util.bus.on('game:move', applyFlip);
      CC.util.bus.on('game:undo', applyFlip);

      // Doi tuy chon giua van thi ap dung ngay, khong bat cho toi nuoc sau
      CC.util.bus.on('prefs:changed', ({ key, val }) => {
        if (key !== 'autoFlip' || !active()) return;
        CC.Board.setFlipped(val ? CC.Rules.turn() === 'b' : false);
      });

      return this;
    },

    /* Nhan ten hai ben — dung cho thanh trang thai */
    labels() {
      return { w: 'Trắng', b: 'Đen' };
    }
  };
})();

;
/* ===== js/cat-svg-body.js ===== */
/* cat-svg-body.js — than meo, ve bang SVG vector
 *
 * MOT bo khung dung chung cho ca BAY con meo. Khac nhau o hai thu:
 *   1. Bang mau lay tu ho so (data-cat-profiles.js)
 *   2. `mark` — mot net rieng ve them (yem, khan, kinh, seo...), xem cat-svg-marks.js
 *
 * Ve rieng bay con la bay lan sua moi khi doi tu the. Mot khung + tham so thi
 * doi mot cho la ca bay con doi theo.
 *
 * Cay nhom (thu tu ve tu duoi len):
 *   #cat-tail    duoi   — vay / dung / cup
 *   #cat-body    than   — co dinh, chi tho
 *   #cat-paws    chan   — de ban / chong cam
 *   #cat-head    dau    — nghieng nhe theo tam trang
 *     #cat-ears  tai    — dung / cup
 *     #cat-face  mat    — do cat-svg-faces.js do noi dung vao
 *   #cat-mark    net rieng cua tung con
 *   #cat-fx      hieu ung Zzz, ngoi sao, dau hoi, giot mo hoi
 */

CC.CatBody = (function () {
  const s = (t, a, c) => CC.util.svg(t, a, c);

  /* Bang mau dang dung — doi theo con meo hien tai.
   * Cac file khac (cat-svg-faces, cat-fx-effects) doc COLORS nen phai cap nhat
   * bien nay moi khi doi meo, khong duoc tao bang moi.
   */
  const COLORS = {
    fur: '#f0a860', furDark: '#d98b3f', belly: '#fce8cf',
    ink: '#4a3520', pink: '#f08fa0', blush: '#f7a8b8'
  };

  function applyProfile(p) {
    COLORS.fur = p.fur;
    COLORS.furDark = p.furDark;
    COLORS.belly = p.belly;
    COLORS.ink = p.ink;
    COLORS.pink = p.pink;
    COLORS.blush = p.pink;
  }

  /* Net vien chung — day, bo tron, hop phong cach de thuong */
  function ink(extra) {
    return Object.assign({
      stroke: COLORS.ink, 'stroke-width': 4,
      'stroke-linejoin': 'round', 'stroke-linecap': 'round'
    }, extra || {});
  }

  function buildTail() {
    const g = s('g', { id: 'cat-tail', class: 'cat-tail' });
    g.appendChild(s('path', ink({
      d: 'M150 165 C185 160 195 130 182 108 C176 97 162 96 158 106 C154 116 164 122 170 116',
      fill: 'none', 'stroke-width': 16, stroke: COLORS.fur
    })));
    return g;
  }

  function buildBody() {
    const g = s('g', { id: 'cat-body', class: 'cat-body' });
    g.appendChild(s('path', ink({
      d: 'M100 192 C62 192 48 166 48 138 C48 112 70 96 100 96 C130 96 152 112 152 138 C152 166 138 192 100 192 Z',
      fill: COLORS.fur
    })));
    g.appendChild(s('ellipse', { cx: 100, cy: 155, rx: 26, ry: 30, fill: COLORS.belly, opacity: 0.95 }));
    return g;
  }

  function buildPaws() {
    const g = s('g', { id: 'cat-paws', class: 'cat-paws' });
    [78, 122].forEach((cx, i) => {
      const p = s('g', { class: 'cat-paw cat-paw-' + (i ? 'r' : 'l') });
      p.appendChild(s('ellipse', ink({ cx, cy: 182, rx: 17, ry: 12, fill: COLORS.belly })));
      [-6, 0, 6].forEach(dx => {
        p.appendChild(s('path', ink({
          d: 'M' + (cx + dx) + ' 176 L' + (cx + dx) + ' 184',
          'stroke-width': 2.5, opacity: 0.55, fill: 'none'
        })));
      });
      g.appendChild(p);
    });
    return g;
  }

  function buildEars() {
    const g = s('g', { id: 'cat-ears', class: 'cat-ears' });
    const ear = (d, dIn, cls) => {
      const e = s('g', { class: 'cat-ear ' + cls });
      e.appendChild(s('path', ink({ d, fill: COLORS.fur })));
      e.appendChild(s('path', { d: dIn, fill: COLORS.pink }));
      return e;
    };
    g.appendChild(ear(
      'M62 46 C56 24 58 12 66 12 C74 12 88 24 96 36 Z',
      'M68 38 C65 26 66 20 70 21 C74 22 81 30 85 37 Z', 'cat-ear-l'));
    g.appendChild(ear(
      'M138 46 C144 24 142 12 134 12 C126 12 112 24 104 36 Z',
      'M132 38 C135 26 134 20 130 21 C126 22 119 30 115 37 Z', 'cat-ear-r'));
    return g;
  }

  function buildHead() {
    const g = s('g', { id: 'cat-head', class: 'cat-head' });
    g.appendChild(buildEars());
    g.appendChild(s('ellipse', ink({ cx: 100, cy: 76, rx: 50, ry: 44, fill: COLORS.fur })));
    // Ba vet soc tren tran
    g.appendChild(s('path', ink({ d: 'M84 40 L80 52', stroke: COLORS.furDark, 'stroke-width': 5, fill: 'none' })));
    g.appendChild(s('path', ink({ d: 'M100 36 L100 49', stroke: COLORS.furDark, 'stroke-width': 5, fill: 'none' })));
    g.appendChild(s('path', ink({ d: 'M116 40 L120 52', stroke: COLORS.furDark, 'stroke-width': 5, fill: 'none' })));
    g.appendChild(s('ellipse', { cx: 100, cy: 96, rx: 27, ry: 18, fill: COLORS.belly }));
    g.appendChild(s('g', { id: 'cat-face', class: 'cat-face' }));
    return g;
  }

  return {
    COLORS,
    ink,

    /* Dung con meo theo ho so va gan vao container. Tra ve phan tu <svg>. */
    mount(container, profile) {
      const p = profile || CC.CatProfiles.current();
      applyProfile(p);

      const svg = s('svg', {
        class: 'cat', id: 'cat-svg',
        viewBox: '0 0 200 210',
        xmlns: 'http://www.w3.org/2000/svg',
        'data-cat': p.id,
        'aria-label': 'Mèo ' + p.name
      });
      svg.appendChild(buildTail());
      svg.appendChild(buildBody());
      svg.appendChild(buildPaws());
      svg.appendChild(buildHead());

      const mark = CC.CatMarks.build(p.mark);
      if (mark) { mark.setAttribute('id', 'cat-mark'); svg.appendChild(mark); }

      svg.appendChild(s('g', { id: 'cat-fx', class: 'cat-fx' }));
      container.appendChild(svg);
      return svg;
    },

    /* Chi rieng KHUON MAT — dung lam anh dai dien o man chon doi thu.
     * Nho gon hon nhieu so voi ca con, va o kich thuoc 56px thi than khong nhin ra gi.
     */
    face(profile, size) {
      const p = profile || CC.CatProfiles.current();
      applyProfile(p);

      const svg = s('svg', {
        class: 'cat-avatar', viewBox: '40 10 120 116',
        width: size || 56, height: size || 56,
        xmlns: 'http://www.w3.org/2000/svg',
        'aria-label': 'Mèo ' + p.name
      });
      svg.appendChild(buildHead());
      // Ve mat o trang thai binh thuong
      CC.CatFaces.render(svg.querySelector('#cat-face'), { eyes: 'normal', mouth: 'normal' });

      // Chi giu net nam TREN DAU — yem/khan/dom nguc bi cat mat o khung nay
      if (CC.CatMarks.onHead(p.mark)) {
        const m = CC.CatMarks.build(p.mark);
        if (m) svg.appendChild(m);
      }
      return svg;
    }
  };
})();

;
/* ===== js/cat-svg-marks.js ===== */
/* cat-svg-marks.js — net rieng cua tung con meo
 *
 * Tach khoi cat-svg-body.js vi day la moi quan tam RIENG: body lo bo khung dung
 * chung cho ca bay con, file nay lo thu lam tung con khac nhau.
 *
 * Moi ham tra ve mot nhom SVG, hoac null neu con do khong co net rieng.
 * Duoc ve SAU cung nen nam de len tren than va dau.
 *
 * `onHead` danh dau net nam TREN DAU — chi nhung net do moi hien o anh dai dien
 * (anh dai dien chi cat phan dau, yem hay khan quang co se bi cat mat).
 */

CC.CatMarks = (function () {
  const s = (t, a, c) => CC.util.svg(t, a, c);
  const C = () => CC.CatBody.COLORS;
  const ink = e => CC.CatBody.ink(e);

  const MARKS = {
    none: { onHead: false, build: () => null },

    /* Sua — yem sua quanh co */
    bib: {
      onHead: false,
      build: () => s('path', ink({
        d: 'M72 118 C72 138 128 138 128 118 C118 128 82 128 72 118 Z',
        fill: '#ffffff', 'stroke-width': 3
      }))
    },

    /* Muc — dom trang giua nguc */
    'chest-spot': {
      onHead: false,
      build: () => s('ellipse', ink({
        cx: 100, cy: 140, rx: 15, ry: 20, fill: '#f2f2f6', 'stroke-width': 3
      }))
    },

    /* Vang — khan quang co, co duoi khan bay ra sau */
    scarf: {
      onHead: false,
      build: () => {
        const g = s('g');
        g.appendChild(s('path', ink({
          d: 'M68 116 C80 128 120 128 132 116 L134 126 C120 138 80 138 66 126 Z',
          fill: '#d94f4f', 'stroke-width': 3
        })));
        g.appendChild(s('path', ink({
          d: 'M126 126 L138 152 L124 148 L120 130 Z', fill: '#c33f3f', 'stroke-width': 3
        })));
        return g;
      }
    },

    /* Tam The — mang mau cam va den tren dau va than */
    calico: {
      onHead: true,
      build: () => {
        const g = s('g', { opacity: 0.95 });
        g.appendChild(s('path', { d: 'M62 52 C70 34 92 30 100 40 C88 44 76 54 70 68 Z', fill: '#c8703a' }));
        g.appendChild(s('path', { d: 'M126 44 C140 50 148 66 146 82 C136 70 128 58 120 50 Z', fill: '#3a3129' }));
        g.appendChild(s('path', { d: 'M52 128 C60 112 76 106 86 112 C72 118 60 130 56 146 Z', fill: '#3a3129' }));
        return g;
      }
    },

    /* But — kinh tron kieu ong cu */
    glasses: {
      onHead: true,
      build: () => {
        const g = s('g', { class: 'cat-glasses' });
        [78, 122].forEach(cx => {
          g.appendChild(s('circle', {
            cx, cy: 74, r: 19, fill: '#ffffff', opacity: 0.16,
            stroke: C().ink, 'stroke-width': 4
          }));
        });
        g.appendChild(s('path', { d: 'M97 74 L103 74', stroke: C().ink, 'stroke-width': 4, fill: 'none' }));
        return g;
      }
    },

    /* Bao — hoa mai: vong ho + cham giua, ne mat va bung */
    rosette: {
      onHead: true,
      build: () => {
        const g = s('g');
        const dark = '#4a3018';
        /* Vong CO Y de ho mot doan. Hoa mai that cua bao cung ho, va o co 54px
         * cua anh dai dien thi vong lien net trong nhu cai nhan chu khong ra dom. */
        const spot = (cx, cy, r) => {
          const k = s('g');
          k.appendChild(s('circle', {
            cx, cy, r, fill: 'none', stroke: dark, 'stroke-width': 3.2,
            'stroke-dasharray': (r * 1.5) + ' ' + (r * 0.9), 'stroke-linecap': 'round'
          }));
          k.appendChild(s('circle', { cx, cy, r: r * 0.34, fill: dark }));
          return k;
        };
        /* Tren dau chi dat o hai ben thai duong va hai ben ma. Giua tran da co ba vet
         * soc cua bo khung dung chung — chong len la roi net ca hai.
         * Cap o ma phai nam TREN y=86: do la noi bat dau chum RAU, keo suot be
         * ngang dau. Da dinh dung loi nay mot lan khi de o y=92. */
        [[68, 52, 7], [132, 52, 7], [60, 74, 7], [140, 74, 7]].forEach(a => g.appendChild(spot(...a)));
        /* Tren than chi hai ben suon: giua la mang bung sang, dat dom len la mat
         * do tuong phan. Hai chan nam o y>170 nen phai dung tren do.
         *
         * MEP TREN phai tu y=134 tro xuong: anh dai dien cat theo viewBox
         * "40 10 120 116" va CHI ve phan dau. Dom nao thoi len tren y=126 se
         * lo lung duoi cam trong anh dai dien vi khong co than do lam nen. */
        [[64, 136, 8], [136, 136, 8], [62, 162, 7], [138, 162, 7]].forEach(a => g.appendChild(spot(...a)));
        return g;
      }
    },

    /* Dai Ka — seo cheo qua mat trai, kem ba vet khau */
    scar: {
      onHead: true,
      build: () => {
        const g = s('g');
        g.appendChild(s('path', {
          d: 'M68 52 L86 88', stroke: C().ink, 'stroke-width': 4,
          'stroke-linecap': 'round', fill: 'none'
        }));
        [58, 68, 78].forEach(y => {
          const x = 70 + (y - 58) * 0.5;
          g.appendChild(s('path', {
            d: 'M' + (x - 5) + ' ' + y + ' L' + (x + 5) + ' ' + y,
            stroke: C().ink, 'stroke-width': 3, 'stroke-linecap': 'round', fill: 'none'
          }));
        });
        return g;
      }
    }
  };

  return {
    /* Tra ve nhom SVG cua net rieng, hoac null */
    build(name) {
      const m = MARKS[name] || MARKS.none;
      return m.build();
    },

    /* Net nay co nam tren dau khong — anh dai dien chi ve nhung net nam tren dau */
    onHead(name) {
      const m = MARKS[name] || MARKS.none;
      return !!m.onHead;
    },

    names: () => Object.keys(MARKS)
  };
})();

;
/* ===== js/cat-svg-faces.js ===== */
/* cat-svg-faces.js — cac kieu mat va mieng cua Leo
 *
 * Bieu cam = mot to hop (mat + mieng + ma hong). File nay chi biet ve tung bo phan;
 * viec ghep chung lai thanh 8 trang thai nam o cat-mood-table.js.
 *
 * Toa do goc: mat trai (78,74), mat phai (122,74), mui (100,90).
 */

CC.CatFaces = (function () {
  const C = CC.CatBody.COLORS;
  const s = (t, a, c) => CC.util.svg(t, a, c);
  const EYE = { l: 78, r: 122, y: 74 };

  /* --- kieu mat --- */
  const EYES = {
    /* Mat thuong: tron den, co cham sang cho co hon */
    normal(cx) {
      const g = s('g');
      g.appendChild(s('ellipse', { cx, cy: EYE.y, rx: 9, ry: 11, fill: C.ink }));
      g.appendChild(s('circle', { cx: cx + 3, cy: EYE.y - 4, r: 3.2, fill: '#fff' }));
      return g;
    },

    /* Nheo mat cuoi ^^ — dung khi dac y */
    happy(cx) {
      return s('path', {
        d: 'M' + (cx - 11) + ' ' + (EYE.y + 3) + ' Q' + cx + ' ' + (EYE.y - 11) + ' ' + (cx + 11) + ' ' + (EYE.y + 3),
        fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round'
      });
    },

    /* Mat tron xoe — hoang hot */
    wide(cx) {
      const g = s('g');
      g.appendChild(s('circle', { cx, cy: EYE.y, r: 14, fill: '#fff', stroke: C.ink, 'stroke-width': 3.5 }));
      g.appendChild(s('circle', { cx, cy: EYE.y, r: 6, fill: C.ink }));
      return g;
    },

    /* Lim dim — buon ngu */
    sleepy(cx) {
      const g = s('g');
      g.appendChild(s('path', {
        d: 'M' + (cx - 11) + ' ' + EYE.y + ' Q' + cx + ' ' + (EYE.y + 7) + ' ' + (cx + 11) + ' ' + EYE.y,
        fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round'
      }));
      return g;
    },

    /* Nham hoan toan — chop mat, an mung */
    closed(cx) {
      return s('path', {
        d: 'M' + (cx - 10) + ' ' + EYE.y + ' L' + (cx + 10) + ' ' + EYE.y,
        fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round'
      });
    },

    /* Rau may xech xuong — xi mat */
    sad(cx, side) {
      const g = s('g');
      g.appendChild(s('ellipse', { cx, cy: EYE.y + 2, rx: 8, ry: 9, fill: C.ink }));
      g.appendChild(s('circle', { cx: cx + 2, cy: EYE.y - 2, r: 2.6, fill: '#fff' }));
      // Long may cheo — huong xech vao trong tao ve buon
      const dir = side === 'l' ? 1 : -1;
      g.appendChild(s('path', {
        d: 'M' + (cx - 11 * dir) + ' ' + (EYE.y - 16) + ' L' + (cx + 9 * dir) + ' ' + (EYE.y - 10),
        fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round'
      }));
      return g;
    },

    /* Mot ben nhuong mat — ngo, khong hieu */
    puzzled(cx, side) {
      const g = s('g');
      g.appendChild(s('ellipse', { cx, cy: EYE.y, rx: 9, ry: side === 'l' ? 11 : 7, fill: C.ink }));
      g.appendChild(s('circle', { cx: cx + 3, cy: EYE.y - 3, r: 3, fill: '#fff' }));
      return g;
    }
  };

  /* --- kieu mieng --- */
  const MOUTHS = {
    /* Mieng meo chuan hinh chu w */
    normal: () => s('path', {
      d: 'M88 96 Q100 106 112 96', fill: 'none',
      stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round'
    }),
    smile: () => s('path', {
      d: 'M84 94 Q100 112 116 94', fill: 'none',
      stroke: C.ink, 'stroke-width': 4.5, 'stroke-linecap': 'round'
    }),
    /* Mieng chu O — bat ngo */
    open: () => {
      const g = s('g');
      g.appendChild(s('ellipse', { cx: 100, cy: 100, rx: 9, ry: 12, fill: '#8c4a4a', stroke: C.ink, 'stroke-width': 3.5 }));
      return g;
    },
    /* Meu */
    frown: () => s('path', {
      d: 'M87 104 Q100 92 113 104', fill: 'none',
      stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round'
    }),
    /* Cuoi nhech mot ben — khia nhe, dung cho giong dai su */
    smirk: () => s('path', {
      d: 'M88 97 Q100 104 114 92', fill: 'none',
      stroke: C.ink, 'stroke-width': 4.5, 'stroke-linecap': 'round'
    })
  };

  function whiskers() {
    const g = s('g', { class: 'cat-whiskers', opacity: 0.75 });
    const line = d => s('path', { d, fill: 'none', stroke: C.ink, 'stroke-width': 2.5, 'stroke-linecap': 'round' });
    g.appendChild(line('M74 92 L46 86'));
    g.appendChild(line('M74 98 L46 100'));
    g.appendChild(line('M126 92 L154 86'));
    g.appendChild(line('M126 98 L154 100'));
    return g;
  }

  function nose() {
    return s('path', {
      d: 'M94 87 L106 87 L100 94 Z',
      fill: C.pink, stroke: C.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round'
    });
  }

  return {
    EYES, MOUTHS,

    /* Ve lai toan bo khuon mat theo mot to hop.
     * spec: {eyes, mouth, blush}
     */
    render(faceGroup, spec) {
      faceGroup.textContent = '';

      const eyeFn = EYES[spec.eyes] || EYES.normal;
      faceGroup.appendChild(eyeFn(EYE.l, 'l'));
      faceGroup.appendChild(eyeFn(EYE.r, 'r'));

      if (spec.blush) {
        [64, 136].forEach(cx => {
          faceGroup.appendChild(s('ellipse', {
            cx, cy: 92, rx: 11, ry: 6.5, fill: C.blush, opacity: 0.75
          }));
        });
      }

      faceGroup.appendChild(whiskers());
      faceGroup.appendChild(nose());
      faceGroup.appendChild((MOUTHS[spec.mouth] || MOUTHS.normal)());
    }
  };
})();

;
/* ===== js/cat-mood-table.js ===== */
/* cat-mood-table.js — bang 8 trang thai cua Leo (du lieu thuan)
 *
 * Moi trang thai la mot TO HOP bo phan, khong phai mot buc ve rieng. Them trang
 * thai moi chi la them mot dong o day.
 *
 * `pri` (uu tien): trang thai uu tien cao de duoc trang thai dang hien.
 *   "Hoang vi mat Hau" phai de duoc "buon ngu" — nguoc lai thi vo ly.
 *
 * `hold`: giu it nhat bao lau truoc khi tu ve binh thuong (ms).
 *   null = giu mai cho toi khi co trang thai khac (dung cho `idle` va `think`).
 */

CC.CatMoods = (function () {
  const MOODS = {
    /* Mac dinh — tho nhe, thinh thoang chop mat */
    idle: {
      pri: 0, hold: null,
      eyes: 'normal', mouth: 'normal',
      cls: 'mood-idle'
    },

    /* Den luot meo — chong cam, duoi ve vay */
    think: {
      pri: 1, hold: null,
      eyes: 'normal', mouth: 'normal',
      cls: 'mood-think'
    },

    /* Vua an quan / dang loi the */
    smug: {
      pri: 3, hold: 2200,
      eyes: 'happy', mouth: 'smirk', blush: true,
      cls: 'mood-smug', fx: 'sparkle'
    },

    /* Mat quan to hoac bi chieu */
    panic: {
      pri: 5, hold: 2400,
      eyes: 'wide', mouth: 'open',
      cls: 'mood-panic', fx: 'sweat'
    },

    /* Dang thua */
    sad: {
      pri: 4, hold: 2600,
      eyes: 'sad', mouth: 'frown',
      cls: 'mood-sad'
    },

    /* Nguoi choi nghi lau */
    sleepy: {
      pri: 2, hold: null,
      eyes: 'sleepy', mouth: 'normal',
      cls: 'mood-sleepy', fx: 'zzz'
    },

    /* Thang van */
    cheer: {
      pri: 6, hold: 4000,
      eyes: 'closed', mouth: 'smile', blush: true,
      cls: 'mood-cheer', fx: 'sparkle'
    },

    /* Nguoi choi lam gi do la — nuoc di ky quac, nhan linh tinh */
    confused: {
      pri: 3, hold: 2000,
      eyes: 'puzzled', mouth: 'normal',
      cls: 'mood-confused', fx: 'question'
    }
  };

  return {
    MOODS,
    get: name => MOODS[name] || MOODS.idle,
    names: () => Object.keys(MOODS)
  };
})();

;
/* ===== js/cat-fx-effects.js ===== */
/* cat-fx-effects.js — hieu ung nho quanh dau Leo
 *
 * Bon hieu ung: Zzz (buon ngu), ngoi sao (mung), dau hoi (ngo), giot mo hoi (hoang).
 * Deu la SVG, chuyen dong do CSS lo (xem css/cat-animations.css).
 */

CC.CatFx = (function () {
  const C = CC.CatBody.COLORS;
  const s = (t, a, c) => CC.util.svg(t, a, c);
  let layer = null;

  const FX = {
    /* Zzz bay len — buon ngu */
    zzz() {
      const g = s('g', { class: 'fx fx-zzz' });
      [[150, 42, 20, 0], [168, 24, 15, 0.6], [182, 10, 11, 1.2]].forEach(([x, y, size, delay]) => {
        g.appendChild(s('text', {
          x, y, class: 'fx-z', 'font-size': size, fill: C.ink,
          style: 'animation-delay:' + delay + 's', text: 'z'
        }));
      });
      return g;
    },

    /* Ngoi sao lap lanh — dac y, an mung */
    sparkle() {
      const g = s('g', { class: 'fx fx-sparkle' });
      const star = 'M0 -9 L2.6 -2.6 L9 0 L2.6 2.6 L0 9 L-2.6 2.6 L-9 0 L-2.6 -2.6 Z';
      [[40, 40, 0], [162, 52, 0.25], [52, 96, 0.5], [156, 20, 0.75]].forEach(([x, y, d]) => {
        g.appendChild(s('path', {
          d: star, fill: '#ffd166',
          transform: 'translate(' + x + ',' + y + ')',
          style: 'animation-delay:' + d + 's'
        }));
      });
      return g;
    },

    /* Dau hoi — khong hieu chuyen gi */
    question() {
      const g = s('g', { class: 'fx fx-question' });
      g.appendChild(s('text', {
        x: 156, y: 32, 'font-size': 40, 'font-weight': 'bold',
        fill: C.ink, text: '?'
      }));
      return g;
    },

    /* Giot mo hoi — hoang hot */
    sweat() {
      const g = s('g', { class: 'fx fx-sweat' });
      [[146, 46], [56, 52]].forEach(([x, y], i) => {
        const d = s('path', {
          d: 'M0 0 C5 7 8 11 8 15 A8 8 0 0 1 -8 15 C-8 11 -5 7 0 0 Z',
          fill: '#7fd4f5', stroke: C.ink, 'stroke-width': 2,
          transform: 'translate(' + x + ',' + y + ') scale(0.9)',
          style: 'animation-delay:' + (i * 0.35) + 's'
        });
        g.appendChild(d);
      });
      return g;
    }
  };

  return {
    init(svgRoot) {
      layer = svgRoot.querySelector('#cat-fx');
      return this;
    },

    /* Hien mot hieu ung, hoac xoa sach neu truyen null */
    show(name) {
      if (!layer) return;
      layer.textContent = '';
      if (!name || !FX[name]) return;
      layer.appendChild(FX[name]());
    },

    clear() {
      if (layer) layer.textContent = '';
    }
  };
})();

;
/* ===== js/cat-mood-controller.js ===== */
/* cat-mood-controller.js — dieu khien bieu cam Leo
 *
 * Ba nguyen tac giu cho meo khong bi "co giat":
 *   1. UU TIEN  — trang thai manh de duoc trang thai yeu (hoang de duoc buon ngu)
 *   2. THOI HAN — bieu cam manh giu 2-3s roi TU VE binh thuong. Meo mung mai khong
 *                 thoi trong rat dai.
 *   3. SAN TOI THIEU — vua doi xong chua duoc MOOD_MIN thi trang thai moi phai xep
 *                 hang cho, tru khi uu tien cao hon. Khong the doi mat 5 lan/giay.
 */

CC.Cat = (function () {
  let host = null, svgRoot = null, faceGroup = null;
  let builtFor = null;             // id con meo dang duoc ve
  let cur = 'idle', curPri = 0, setAt = 0;
  let holdTimer = null, blinkTimer = null, idleTimer = null;
  let pending = null;
  let blinking = false;

  /* Dung (hoac dung lai) con meo dang doi dau.
   *
   * Moi muc Elo la MOT NHAN VAT khac — khac mau long, khac net rieng. Nen khi
   * nguoi choi doi muc thi phai ve lai, khong the giu nguyen hinh cu.
   */
  function build() {
    const p = CC.CatProfiles.current();
    if (svgRoot && builtFor === p.id) return;

    if (svgRoot) svgRoot.remove();
    svgRoot = CC.CatBody.mount(host, p);
    faceGroup = svgRoot.querySelector('#cat-face');
    builtFor = p.id;
    CC.CatFx.init(svgRoot);
    applyNow('idle');
  }

  /* Trang thai nen: dang toi luot meo thi 'think', khong thi 'idle' */
  function baseMood() {
    return CC.Game && CC.Game.state.thinking ? 'think' : 'idle';
  }

  function paint(name) {
    const m = CC.CatMoods.get(name);
    CC.CatFaces.render(faceGroup, m);
    // Lop CSS dieu khien tu the than/tai/duoi
    svgRoot.setAttribute('class', 'cat ' + (m.cls || ''));
    CC.CatFx.show(m.fx || null);
  }

  function applyNow(name) {
    const m = CC.CatMoods.get(name);
    cur = name;
    curPri = m.pri;
    setAt = Date.now();
    paint(name);

    clearTimeout(holdTimer);
    if (m.hold) {
      holdTimer = setTimeout(() => {
        // Het thoi han: quay ve trang thai nen, hoac lay cai dang cho
        const next = pending || baseMood();
        pending = null;
        applyNow(next);
      }, m.hold);
    }
  }

  /* --- chop mat ---
   * Chi chop o trang thai binh thuong. Dang hoang hot ma chop mat thi vo duyen.
   */
  function scheduleBlink() {
    clearTimeout(blinkTimer);
    blinkTimer = setTimeout(() => {
      if (document.hidden) { scheduleBlink(); return; }
      if ((cur === 'idle' || cur === 'think') && !blinking) {
        blinking = true;
        const m = CC.CatMoods.get(cur);
        CC.CatFaces.render(faceGroup, Object.assign({}, m, { eyes: 'closed' }));
        setTimeout(() => {
          blinking = false;
          if (cur === 'idle' || cur === 'think') paint(cur);
        }, 130);
      }
      scheduleBlink();
    }, CC.util.randInt(3000, 6500));
  }

  /* --- buon ngu khi nguoi choi nghi lau --- */
  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (CC.Game && CC.Game.state.mode === 'ai' && CC.Game.isPlayerTurn() && !CC.Game.state.over) {
        api.set('sleepy');
      }
    }, CC.cfg.IDLE_SLEEPY);
  }

  const api = {
    mount(container) {
      host = container;
      build();
      scheduleBlink();

      // Tab an thi dung het chuyen dong — tiet kiem pin tren dien thoai
      document.addEventListener('visibilitychange', () => {
        svgRoot.classList.toggle('paused', document.hidden);
      });
      return api;
    },

    current: () => cur,

    /* Dat bieu cam. opts.force = bo qua luat uu tien va san toi thieu. */
    set(name, opts) {
      opts = opts || {};
      if (!svgRoot) return;
      const m = CC.CatMoods.get(name);
      if (name === cur && !opts.force) return;

      if (opts.force) { pending = null; applyNow(name); return; }

      // Uu tien thap hon trang thai dang chay -> xep hang, khong cat ngang
      if (m.pri < curPri && CC.CatMoods.get(cur).hold) { pending = name; return; }

      // Vua doi xong, chua du san toi thieu -> cho cho het san
      const since = Date.now() - setAt;
      if (since < CC.cfg.MOOD_MIN && m.pri <= curPri) {
        pending = name;
        setTimeout(() => {
          if (pending === name) { pending = null; applyNow(name); }
        }, CC.cfg.MOOD_MIN - since);
        return;
      }

      applyNow(name);
    },

    /* Noi bieu cam vao dien bien van co */
    init() {
      const B = CC.util.bus;

      B.on('game:thinking', ({ on }) => {
        if (on) { clearTimeout(idleTimer); api.set('think'); }
        else { api.set(baseMood()); resetIdleTimer(); }
      });

      B.on('game:move', ({ move, byPlayer }) => {
        resetIdleTimer();
        if (CC.Game.state.mode !== 'ai') return;

        const catColor = CC.Game.state.playerColor === 'w' ? 'b' : 'w';
        const val = move.captured ? CC.Rules.VALUE[move.captured] : 0;

        if (byPlayer) {
          // Nguoi choi an quan cua meo
          if (val >= 3) api.set('panic');
          else if (CC.Rules.inCheck() && CC.Rules.turn() === catColor) api.set('panic');
        } else {
          if (val >= 3) api.set('smug');
          else if (CC.Rules.inCheck()) api.set('smug');
        }
      });

      // Meo tu di ho -> ngo ra, day la cho bien loi thanh tinh cach
      B.on('engine:picked', ({ wasBlunder }) => {
        if (wasBlunder) api.set('confused');
      });

      B.on('game:over', ({ outcome, mode }) => {
        clearTimeout(idleTimer);
        if (mode !== 'ai') { api.set('idle', { force: true }); return; }
        // outcome tinh theo goc nhin NGUOI CHOI, nen dao lai cho meo
        if (outcome === 'loss') api.set('cheer', { force: true });
        else if (outcome === 'win') api.set('sad', { force: true });
        else api.set('idle', { force: true });
      });

      // Doi muc = doi nhan vat -> phai ve lai con meo truoc khi dat bieu cam
      B.on('game:start', () => { build(); api.set('idle', { force: true }); resetIdleTimer(); });

      resetIdleTimer();
      return api;
    }
  };

  return api;
})();

;
/* ===== js/chat-lines-kitten.js ===== */
/* chat-lines-kitten.js — giong "Leo nho" (Elo 400-700)
 *
 * Tinh cach: ngay tho, hay so, de mung de tui. Tu xung "Leo". Hay dung "a", "hic".
 * Danh co dor nhung de thuong — nguoi choi thang cung khong thay nham chan.
 *
 * {cat}   -> ten meo      {piece} -> ten quan co
 * Moi su kien TOI THIEU 6 cau. It hon la lap ngay van thu hai.
 */

CC.ChatLines = CC.ChatLines || {};
CC.ChatLines.kitten = {
  game_start: [
    'Chào Anh ạ! {cat} mới học cờ thôi, Anh đi nhẹ tay nha~',
    'Hí hí, Anh chơi với {cat} hả? {cat} mừng quá!',
    '{cat} sẵn sàng rồi ạ! Mà {cat} hay quên luật lắm…',
    'Anh ơi, {cat} đánh dở lắm, đừng cười {cat} nha!',
    'Ván mới! {cat} vừa ăn cá xong nên tỉnh táo lắm ạ.',
    '{cat} đi trước hay Anh đi trước ạ? À… Trắng đi trước nhỉ.'
  ],

  cat_captured_big: [
    'Ơ! {cat} ăn được con {piece} thật á? {cat} không cố ý đâu ạ!',
    'Oa, con {piece} tự đi vào chỗ {cat} mà! {cat} đâu có làm gì…',
    '{cat} ăn được rồi! {cat} giỏi chưa Anh?',
    'Con {piece} ngon quá~ {cat} cảm ơn Anh ạ!',
    'Hí hí, {cat} có con {piece} rồi nha!',
    '{cat} nhắm mắt đi đại mà trúng con {piece} luôn!'
  ],

  cat_captured_small: [
    '{cat} ăn con Tốt bé bé này~',
    'Con {piece} nhỏ xíu à, {cat} vẫn lấy nha!',
    'Hí hí, thêm một con nữa cho {cat}.',
    '{cat} thấy trống nên {cat} đi vào thôi ạ.',
    'Tốt cũng là quân mà Anh, {cat} lấy nha!',
    'Nhỏ nhưng mà {cat} vẫn thích~'
  ],

  cat_lost_queen: [
    'HUHU! Con Hậu của {cat}! Anh ác quá đi mất…',
    'Không! Hậu của {cat}… {cat} buồn ghê ạ.',
    '{cat} mất Hậu rồi… {cat} đi khóc một chút nha.',
    'Anh ơi trả Hậu cho {cat} đi mà, {cat} xin đó!',
    'Hậu ơi… {cat} xin lỗi vì không giữ được con.',
    '{cat} tưởng chỗ đó an toàn mà… hic hic.'
  ],

  cat_lost_big: [
    'Ơ, con {piece} của {cat}! Sao Anh thấy được hay vậy…',
    'Hic, {cat} mất {piece} rồi ạ.',
    '{cat} quên mất là con {piece} đứng ở đó…',
    'Anh giỏi quá, {cat} không nhìn ra chỗ đó luôn.',
    'Mất {piece} rồi, {cat} phải cẩn thận hơn mới được.',
    '{cat} đau lòng ghê ạ… con {piece} đó {cat} thương lắm.'
  ],

  cat_lost_small: [
    'Ơ, con Tốt của {cat}…',
    'Thôi kệ, Tốt bé mà, {cat} còn nhiều lắm ạ.',
    'Anh lấy Tốt của {cat} rồi kìa!',
    'Hic, mất một con rồi.',
    '{cat} không để ý chỗ đó… ',
    'Được rồi được rồi, {cat} cho Anh con đó vậy.'
  ],

  player_check: [
    'A! Vua của {cat} bị chiếu rồi! {cat} phải làm sao đây ạ?',
    'Hoảng quá hoảng quá! Vua ơi chạy đi!',
    'Anh chiếu {cat} á? {cat} sợ rồi đó!',
    'Đợi {cat} tí, {cat} phải cứu Vua đã!',
    'Vua của {cat} run rồi ạ…',
    'Chiếu! {cat} biết mà, {cat} biết mà… (thật ra {cat} không biết)'
  ],

  cat_check: [
    'Chiếu nha Anh! {cat} chiếu được đó!',
    'Ơ {cat} chiếu Anh thật á? {cat} hay ghê!',
    'Anh ơi, Vua của Anh kìa!',
    'Hí hí, {cat} chiếu rồi nha~',
    '{cat} đi đại mà thành chiếu luôn!',
    'Coi chừng Vua nha Anh, {cat} nhắc trước đó.'
  ],

  castling: [
    'Nhập thành! Vua trốn vào góc cho an toàn ạ.',
    '{cat} giấu Vua đi nha, Anh đừng tìm!',
    'Vua với Xe đổi chỗ được luôn, hay ghê ha Anh.',
    '{cat} mới học được cái này đó!',
    'Vua vào nhà rồi, Anh không bắt được đâu~',
    'Nhập thành xong {cat} yên tâm hẳn ạ.'
  ],

  en_passant: [
    'Ơ! Bắt tốt qua đường được á? {cat} tưởng không được!',
    'Cái này lạ ghê… mà hợp lệ đúng không Anh?',
    '{cat} học được chiêu này hôm qua nè!',
    'Tốt đi ngang mà vẫn bị bắt, tội ghê.',
    'Luật cờ vua kỳ ghê ha Anh.',
    '{cat} suýt quên mất luật này luôn ạ!'
  ],

  promotion: [
    'Tốt lên {piece} rồi! Oa, lớn nhanh ghê!',
    'Con Tốt bé xíu mà thành {piece} luôn á?',
    '{cat} cũng muốn lớn nhanh như vậy…',
    'Chúc mừng con Tốt nha!',
    'Phong cấp rồi! {cat} thấy oai ghê ạ.',
    'Từ Tốt thành {piece}, đời thay đổi thật!'
  ],

  player_blunder: [
    'Ơ… Anh chắc chưa ạ? {cat} thấy hơi lạ…',
    'Anh ơi, nước đó… {cat} không dám nói đâu.',
    '{cat} mà là Anh thì {cat} không đi vậy… mà {cat} dở nên chắc {cat} sai.',
    'Ơ ơ ơ! {cat} thấy cơ hội rồi!',
    'Anh cho {cat} hả? {cat} cảm ơn ạ!',
    'Hình như Anh nhấn nhầm ô rồi thì phải…'
  ],

  player_mistake: [
    'Nước đó hơi lạ ha Anh…',
    '{cat} thấy còn nước khác hay hơn mà…',
    'Ừm, {cat} không chắc lắm nhưng…',
    'Anh có chắc không ạ? {cat} hỏi thôi.',
    '{cat} tưởng Anh sẽ đi chỗ khác cơ.',
    'Hơi tiếc chút xíu thôi ạ.'
  ],

  player_best: [
    'Oa! Nước đó hay quá Anh ơi!',
    'Anh giỏi ghê, {cat} không nghĩ ra nước đó.',
    'Đúng nước máy chọn luôn đó Anh!',
    '{cat} học được rồi, cảm ơn Anh nha!',
    'Anh chơi hay quá, {cat} phải cố lên mới được.',
    'Hay! {cat} vỗ tay cho Anh nè (bằng chân).'
  ],

  cat_blundered: [
    'Ơ… {cat} nhấn nhầm rồi! Cho {cat} đi lại đi mà!',
    'Á! {cat} không định đi đó đâu ạ…',
    '{cat} lỡ tay… Anh đừng nhìn {cat} như vậy.',
    'Hic, {cat} hậu đậu quá đi.',
    '{cat} mải nghĩ đến cá nên đi nhầm rồi…',
    'Coi như {cat} tặng Anh đó, hihi… ({cat} sắp khóc)'
  ],

  cat_winning: [
    '{cat} đang hơn quân hả? {cat} cũng không biết nữa!',
    'Hí hí, {cat} thấy vui vui mà không rõ vì sao.',
    'Anh ơi, {cat} có nhiều quân hơn nè!',
    '{cat} giỏi thật rồi ạ!',
    'Anh đừng buồn nha, {cat} may thôi.',
    '{cat} dẫn trước rồi! {cat} phấn khích quá!'
  ],

  cat_losing: [
    '{cat} ít quân quá rồi… Anh nhẹ tay với {cat} nha.',
    'Hic, {cat} sắp thua rồi ạ.',
    'Anh giỏi quá đi, {cat} theo không kịp.',
    '{cat} cố gắng mà… hic.',
    '{cat} buồn ghê. Nhưng {cat} không bỏ cuộc đâu!',
    'Anh ơi, cho {cat} một con quân được không ạ?'
  ],

  endgame: [
    'Ít quân quá rồi, ván sắp xong rồi ha Anh.',
    'Tàn cuộc rồi! {cat} hay lú ở đoạn này lắm ạ.',
    'Bàn cờ trống trải ghê…',
    '{cat} phải cẩn thận, tàn cuộc khó lắm.',
    'Còn ít quân, mỗi nước đều quan trọng ha Anh.',
    'Đến đoạn này {cat} hay quên cách chiếu hết…'
  ],

  player_slow: [
    'Anh nghĩ lâu ghê… {cat} ngủ gật mất rồi.',
    'Anh ơi, {cat} đợi mãi…',
    'Zzz… ơ, Anh đi chưa ạ?',
    '{cat} tranh thủ liếm lông một chút nha.',
    'Nước này khó lắm hả Anh?',
    '{cat} đói bụng rồi… Anh đi nhanh giùm {cat}.'
  ],

  player_fast: [
    'Anh đi nhanh ghê! {cat} theo không kịp.',
    'Nhanh vậy Anh nghĩ kịp không đó?',
    'Oa, Anh quyết đoán quá!',
    '{cat} cũng muốn đi nhanh như vậy…',
    'Anh chơi nhanh làm {cat} hồi hộp ghê.',
    'Từ từ thôi Anh, {cat} còn đang nghĩ nè!'
  ],

  game_win: [
    '{cat} thắng rồi á?! {cat} không tin luôn!',
    'Oa oa oa! {cat} thắng! {cat} phải khoe với mẹ mới được!',
    '{cat} thắng thật hả Anh? Anh có nhường {cat} không đó?',
    'Hí hí, hôm nay {cat} may quá!',
    '{cat} vui quá đi mất! Cảm ơn Anh đã chơi với {cat}!',
    '{cat} thắng rồi! Anh chơi lại với {cat} nha?'
  ],

  game_loss: [
    'Anh thắng rồi… {cat} cố hết sức rồi đó ạ.',
    'Hic, {cat} thua. Nhưng {cat} vui vì được chơi với Anh!',
    'Anh giỏi thật! {cat} phải học thêm nhiều.',
    '{cat} thua rồi… cho {cat} chơi lại đi mà!',
    'Chúc mừng Anh ạ! {cat} không buồn đâu… (buồn xíu thôi)',
    'Anh chơi hay quá. Lần sau {cat} sẽ cố hơn!'
  ],

  game_draw: [
    'Hoà rồi! Vậy là không ai thua ha Anh, hay quá!',
    'Hoà nha! {cat} thích hoà, không ai buồn cả.',
    'Ơ, hoà á? {cat} tưởng {cat} thua rồi chứ.',
    'Ván này căng ghê! Hoà là công bằng ạ.',
    'Không ai thắng, vậy hai đứa mình cùng vui nha!',
    'Hoà! {cat} thấy nhẹ cả người.'
  ],

  /* --- tra loi nguoi choi --- */
  greet: [
    'Chào Anh ạ! {cat} đây!',
    'Meo meo~ Anh khoẻ không ạ?',
    'Hí hí, Anh chào {cat} hả? {cat} vui quá!',
    'Xin chào Anh! Mình chơi tiếp nha?'
  ],
  ask_name: [
    'Dạ em tên {cat} ạ! Anh nhớ tên em nha~',
    'Em là {cat}! Meo meo!',
    '{cat} ạ! Tên đẹp không Anh?',
    'Em tên {cat}, còn Anh tên gì ạ?'
  ],
  praise: [
    'Anh khen {cat} hả? {cat} ngại quá đi…',
    'Hí hí, {cat} vui lắm ạ!',
    'Anh tốt với {cat} ghê~',
    '{cat} được khen rồi! {cat} phải cố hơn nữa!'
  ],
  insult: [
    'Hic… {cat} biết {cat} dở mà…',
    'Anh đừng chê {cat}, {cat} buồn đó!',
    '{cat} mới học thôi mà Anh…',
    '{cat} sẽ giỏi lên cho Anh xem!'
  ],
  unknown: [
    'Meo? {cat} chỉ biết chơi cờ với ăn cá thôi ạ.',
    '{cat} không hiểu… nhưng {cat} gật đầu cho Anh vui nha!',
    'Hả? {cat} nghe không rõ… {cat} là mèo mà.',
    '{cat} chỉ hiểu vài từ thôi ạ. Anh bấm nút bên dưới đi!'
  ],
  hint_given: [
    '{cat} mách nhỏ nha: {hint}',
    '{cat} thấy nước này nè: {hint}',
    'Đừng nói ai nha… {hint}',
    '{cat} giúp Anh lần này thôi đó: {hint}'
  ],
  hint_none: [
    '{cat} cũng không biết đi đâu nữa ạ…',
    'Khó quá, {cat} chịu thôi!',
    '{cat} nghĩ mãi mà không ra…'
  ],
  undo_ok: [
    'Thôi được, {cat} cho Anh đi lại đó. Chỉ lần này thôi nha!',
    'Hí hí, {cat} tốt bụng lắm. Anh đi lại đi ạ.',
    'Được thôi! {cat} cũng hay đi nhầm mà.'
  ]
};

;
/* ===== js/chat-lines-adult.js ===== */
/* chat-lines-adult.js — giong "Leo lon" (Elo 850-1150)
 *
 * Tinh cach: tu tin, hay khoe, thich tha thinh nhe. Tu xung "em". Hay dung "nha~", "hehe".
 * Da biet minh dang lam gi — khac han giong meo con o cho khong con "khong co y".
 */

CC.ChatLines = CC.ChatLines || {};
CC.ChatLines.adult = {
  game_start: [
    'Chào Anh~ Hôm nay em thấy tay em nóng lắm đó.',
    'Ván mới nha! Anh chuẩn bị tinh thần đi ạ.',
    'Em vừa xem lại vài ván cũ rồi. Anh cẩn thận nha~',
    'Bắt đầu thôi! Em không nhường đâu đó.',
    'Anh với em lại gặp nhau rồi. Lần này em quyết tâm hơn.',
    'Em đã sẵn sàng. Anh đi trước đi ạ~'
  ],

  cat_captured_big: [
    'Hehe, con {piece} đó em nhắm từ nãy rồi nha~',
    'Cảm ơn Anh vì con {piece} ạ. Em nhận nhé!',
    'Em tính từ ba nước trước rồi đó Anh.',
    'Con {piece} này về tay em rồi~',
    'Anh sơ hở một chút thôi là em lấy liền.',
    'Em thích nhất là ăn {piece}. Ngon ghê!'
  ],

  cat_captured_small: [
    'Một con Tốt cũng là quân mà Anh~',
    'Em gom từng chút một thôi ạ.',
    'Tốt nhỏ nhưng tàn cuộc quan trọng lắm đó.',
    'Em lấy con này nha, không phiền chứ ạ?',
    'Từng chút từng chút, rồi Anh sẽ thấy khác biệt~',
    'Nhặt nhạnh vậy thôi mà lâu dài lời lắm.'
  ],

  cat_lost_queen: [
    'Á! Hậu của em… Anh chơi rát quá!',
    'Được lắm Anh. Em công nhận nước đó hay.',
    'Mất Hậu rồi… nhưng em chưa bỏ cuộc đâu nha.',
    'Anh tính kỹ ghê. Em phục.',
    'Ối, em sơ ý thật. Từ giờ em nghiêm túc đây.',
    'Hậu đi rồi thì em đánh bằng đầu vậy.'
  ],

  cat_lost_big: [
    'Con {piece} của em… Anh nhanh tay ghê.',
    'Ừm, em đổi được gì không nhỉ… ',
    'Anh thấy chỗ đó nhanh thật đó.',
    'Mất {piece} rồi. Em phải tính lại thôi.',
    'Nước đó của Anh sắc lắm ạ.',
    'Em hơi chủ quan. Nhận sai.'
  ],

  cat_lost_small: [
    'Một con Tốt thôi mà, em không tiếc.',
    'Anh lấy con đó cũng được, em có tính rồi.',
    'Ừm, đổi vậy em thấy ổn.',
    'Tốt đi thì Tốt đi, em còn thế mà.',
    'Em cho Anh con đó, đừng vội mừng nha~',
    'Chuyện nhỏ thôi ạ.'
  ],

  player_check: [
    'Chiếu à? Được, để em xử lý.',
    'Em thấy rồi Anh. Vua em không dễ bắt đâu.',
    'Anh chiếu hay đó, nhưng em có đường ra.',
    'Hơi bất ngờ. Nhưng chỉ hơi thôi nha~',
    'Vua em né được. Anh thử tiếp đi ạ.',
    'Chiếu vậy chưa đủ đâu Anh.'
  ],

  cat_check: [
    'Chiếu nha Anh~ Anh tính sao đây?',
    'Vua của Anh đang hơi trống đó ạ.',
    'Em chiếu rồi. Anh đừng vội nha.',
    'Hehe, em thích chỗ này lắm.',
    'Chiếu! Em chuẩn bị nước này lâu rồi đó.',
    'Anh coi chừng Vua nha~'
  ],

  castling: [
    'Nhập thành cho Vua an toàn đã ạ.',
    'Em cất Vua vào góc, giờ tính công thôi.',
    'Xong phần phòng thủ. Giờ tới lượt tấn công~',
    'Vua yên vị rồi, em thoải mái hơn nhiều.',
    'Nhập thành sớm là thói quen tốt đó Anh.',
    'Giờ Xe của em vào cuộc được rồi.'
  ],

  en_passant: [
    'Bắt tốt qua đường~ Anh có thấy trước không ạ?',
    'Luật này ít người để ý lắm đó.',
    'Em thích chiêu này ghê.',
    'Tốt đi hai ô là bị em bắt liền nha.',
    'Nước này nhiều người quên mất.',
    'Hehe, luật là luật thôi ạ.'
  ],

  promotion: [
    'Tốt lên {piece} rồi nha~ Cuộc đời đổi khác.',
    'Từ Tốt thành {piece}, thấy chưa Anh, kiên nhẫn có giá.',
    'Phong cấp! Bàn cờ giờ khác hẳn rồi.',
    'Con Tốt đó em nuôi từ đầu ván đó ạ.',
    'Có {piece} rồi, thế trận đổi luôn.',
    'Đây mới là lúc ván cờ thật sự bắt đầu~'
  ],

  player_blunder: [
    'Ơ… Anh chắc chứ ạ? Em thấy có gì đó không ổn.',
    'Hehe, em cảm ơn Anh nha~',
    'Nước đó Anh cho em cơ hội lớn rồi đó.',
    'Em không nỡ… mà thôi, em vẫn lấy.',
    'Anh đi hơi vội rồi. Em tận dụng nha.',
    'Đây là lúc em phải cảm ơn Anh ạ.'
  ],

  player_mistake: [
    'Nước đó hơi lỏng đó Anh.',
    'Em nghĩ còn nước tốt hơn mà…',
    'Hơi tiếc cho Anh chút.',
    'Ừm, em thấy Anh vừa mất một nhịp.',
    'Không sai hẳn, nhưng chưa phải hay nhất ạ.',
    'Anh cho em thở một chút rồi đó~'
  ],

  player_best: [
    'Nước đó chuẩn lắm Anh ạ. Em công nhận.',
    'Hay! Em không tìm ra nước nào tốt hơn.',
    'Anh đánh chắc tay ghê.',
    'Chính xác luôn. Em phải cẩn thận rồi.',
    'Nước đó đúng ý em định đi đó ạ.',
    'Em bắt đầu thấy khó rồi đây~'
  ],

  cat_blundered: [
    'Ơ… em vừa làm gì vậy trời.',
    'Em lỡ tay rồi. Anh đừng cười em nha.',
    'Ừm… coi như em thử Anh thôi ạ. (không phải đâu)',
    'Em mất tập trung một giây. Đắt thật.',
    'Nước đó là em sai. Em nhận.',
    'Thôi xong, em vừa tặng Anh một món quà.'
  ],

  cat_winning: [
    'Em đang dẫn trước rồi đó Anh~',
    'Thế này em thấy dễ thở hẳn.',
    'Anh cố lên nha, em chưa thắng đâu.',
    'Em hơn quân rồi, giờ chỉ cần chắc tay.',
    'Hehe, em thích thế cờ này lắm.',
    'Anh còn cơ hội mà, đừng nản ạ.'
  ],

  cat_losing: [
    'Anh đánh rát quá… em phải nghĩ kỹ hơn.',
    'Em đang thua rồi. Nhưng cờ chưa tàn đâu nha.',
    'Ừm, thế này khó cho em thật.',
    'Anh chơi hay lắm ạ. Em công nhận.',
    'Em phải tìm cách gỡ thôi.',
    'Chưa xong đâu Anh, em còn bài đấy~'
  ],

  endgame: [
    'Vào tàn cuộc rồi. Đây mới là lúc phân thắng bại.',
    'Ít quân rồi, mỗi nước đều nặng ký đó Anh.',
    'Tàn cuộc là sở trường của em nha~',
    'Giờ Vua phải xông lên rồi ạ.',
    'Tốt thông lúc này quý lắm đó.',
    'Cẩn thận nha Anh, tàn cuộc dễ trượt tay lắm.'
  ],

  player_slow: [
    'Anh nghĩ kỹ ghê~ Em đợi được mà.',
    'Nước này khó thật hả Anh?',
    'Em tranh thủ duỗi người một chút nha.',
    'Anh cứ từ từ, em không vội đâu ạ.',
    'Suy nghĩ lâu vậy chắc Anh đang tính nước hiểm.',
    'Em bắt đầu hồi hộp rồi đó…'
  ],

  player_fast: [
    'Anh đi nhanh vậy có chắc không đó~',
    'Nhanh quá! Anh tự tin ghê.',
    'Em thích người chơi quyết đoán ạ.',
    'Đi nhanh vậy em cũng phải tăng tốc thôi.',
    'Anh đọc thế cờ nhanh thật.',
    'Cẩn thận nha, nhanh dễ hớ lắm đó~'
  ],

  game_win: [
    'Em thắng rồi~ Anh chơi hay lắm ạ!',
    'Hehe, lần này em may hơn một chút.',
    'Cảm ơn Anh đã chơi với em. Ván hay lắm!',
    'Em thắng! Anh chơi lại không ạ?',
    'Thắng rồi! Nhưng Anh làm em toát mồ hôi đó.',
    'Ván này căng ghê. Em vui lắm ạ!'
  ],

  game_loss: [
    'Anh thắng rồi. Em tâm phục khẩu phục ạ.',
    'Em thua thật rồi. Anh đánh hay lắm!',
    'Chúc mừng Anh~ Cho em phục thù nha?',
    'Em học được nhiều từ ván này đó ạ.',
    'Anh mạnh hơn em nghĩ. Em nể thật.',
    'Thua rồi! Nhưng em thích ván này lắm.'
  ],

  game_draw: [
    'Hoà nha~ Ván này hai bên đều chắc tay ạ.',
    'Hoà là công bằng. Em không tiếc.',
    'Không ai thắng, nghĩa là cả hai đều hay đó Anh.',
    'Hoà rồi! Ván hay ghê.',
    'Cân sức thật. Em thích kiểu ván này.',
    'Hoà thôi ạ. Lần sau phân thắng bại nha~'
  ],

  /* --- tra loi nguoi choi --- */
  greet: [
    'Chào Anh~ Em đây ạ!',
    'Meo~ Anh tới rồi à?',
    'Chào Anh! Mình đánh tiếp nha?',
    'Hehe, chào Anh ạ!'
  ],
  ask_name: [
    'Dạ em tên {cat} ạ! Anh nhớ nha~',
    'Em là {cat}. Tên dễ thương đúng không ạ?',
    '{cat} ạ! Còn Anh tên gì thế?',
    'Em tên {cat}. Anh gọi em vậy là được rồi~'
  ],
  praise: [
    'Anh khen làm em ngại quá~',
    'Hehe, em cũng thấy em hay hay.',
    'Cảm ơn Anh ạ! Em vui lắm.',
    'Được Anh khen là em có động lực rồi!'
  ],
  insult: [
    'Ơ, Anh chê em à? Em đánh cho Anh xem nha!',
    'Em ghi nhớ câu đó đấy~',
    'Được, để em chứng minh cho Anh thấy.',
    'Anh nói vậy em buồn đó… mà thôi, đánh tiếp!'
  ],
  unknown: [
    'Meo? Em chỉ hiểu chuyện cờ với chuyện cá thôi ạ.',
    'Em không hiểu lắm… Anh bấm nút bên dưới cho nhanh nha~',
    'Hả? Em là mèo mà Anh, đâu giỏi tiếng người.',
    'Em gật đầu cho có lệ thôi chứ em không hiểu đâu ạ.'
  ],
  hint_given: [
    'Em mách nhỏ nha: {hint}',
    'Nếu là em thì em sẽ: {hint}',
    'Đừng nói ai đó~ {hint}',
    'Lần này em giúp Anh: {hint}'
  ],
  hint_none: [
    'Thế này thì em cũng bó tay ạ.',
    'Em nghĩ mãi không ra nước nào hay…',
    'Khó quá Anh ơi, em chịu.'
  ],
  undo_ok: [
    'Được rồi, em cho Anh đi lại đó~',
    'Lần này thôi nha Anh!',
    'Em dễ tính lắm. Anh đi lại đi ạ.'
  ]
};

;
/* ===== js/chat-lines-master.js ===== */
/* chat-lines-master.js — giong "Leo dai su" (Elo 1320-1600)
 *
 * Tinh cach: diem dam, noi it, khia nhe khong cay doc. Van xung "em" voi nguoi
 * choi (giu le do) nhung khong con lang xang. Cau NGAN — day la dac diem lon
 * nhat phan biet voi hai giong kia. Noi dai la mat chat.
 */

CC.ChatLines = CC.ChatLines || {};
CC.ChatLines.master = {
  game_start: [
    'Chào Anh. Bắt đầu thôi ạ.',
    'Em đã sẵn sàng. Mời Anh.',
    'Ván mới. Em sẽ chơi nghiêm túc.',
    'Hôm nay em muốn xem Anh tiến bộ tới đâu.',
    'Mời Anh đi trước ạ.',
    'Em nghe nói Anh chơi khá. Để xem.'
  ],

  cat_captured_big: [
    'Con {piece} đó đứng sai chỗ từ lâu rồi ạ.',
    'Nước thứ chín của Anh đã định sẵn chuyện này.',
    'Em nhận {piece}. Cảm ơn Anh.',
    'Chuyện phải đến thôi ạ.',
    'Em chờ nước này từ nãy.',
    'Một quân đổi lấy thế trận. Em thấy đáng.'
  ],

  cat_captured_small: [
    'Một con Tốt. Nhỏ, nhưng tàn cuộc sẽ nói khác.',
    'Em lấy con này ạ.',
    'Tốt hôm nay, Hậu ngày mai.',
    'Từng chút một thôi.',
    'Cấu trúc Tốt của Anh vừa yếu đi rồi đó.',
    'Em không vội.'
  ],

  cat_lost_queen: [
    'Nước hay. Em thật lòng khen ạ.',
    'Em tính thiếu một nhịp. Anh giỏi.',
    'Mất Hậu. Nhưng ván chưa xong.',
    'Anh xứng đáng với nước đó.',
    'Em nhận sai. Giờ mới là phần khó.',
    'Được lắm Anh. Em nghiêm túc đây.'
  ],

  cat_lost_big: [
    'Anh thấy chỗ đó nhanh thật.',
    'Em đánh đổi có tính toán. Anh chờ xem.',
    'Mất {piece}. Chấp nhận được.',
    'Nước đó của Anh chính xác.',
    'Em ghi nhận.',
    'Không sao. Em còn thế.'
  ],

  cat_lost_small: [
    'Một con Tốt không đổi được gì đâu ạ.',
    'Em cho Anh con đó.',
    'Đúng như em tính.',
    'Nhỏ thôi.',
    'Anh vừa nhận một món quà có điều kiện đấy.',
    'Em không tiếc.'
  ],

  player_check: [
    'Em thấy rồi ạ.',
    'Chiếu. Nhưng chưa đủ.',
    'Vua em vẫn ổn.',
    'Nước đó em đã tính tới.',
    'Anh vội quá rồi.',
    'Em có đường ra.'
  ],

  cat_check: [
    'Chiếu ạ.',
    'Mời Anh xử lý.',
    'Vua Anh đang thiếu chỗ thở.',
    'Em bắt đầu ạ.',
    'Chiếu. Anh còn đúng một nước đúng thôi.',
    'Anh nên cẩn thận từ đây.'
  ],

  castling: [
    'Vua vào chỗ an toàn. Giờ mới tính chuyện lớn.',
    'Nhập thành. Xong phần chuẩn bị.',
    'Xe của em vào cuộc rồi ạ.',
    'Trật tự trước, tấn công sau.',
    'Em không thích Vua đứng giữa bàn.',
    'Xong. Giờ tới phần của Anh.'
  ],

  en_passant: [
    'Luật là luật ạ.',
    'Anh quên nước này rồi phải không.',
    'Bắt tốt qua đường.',
    'Chi tiết nhỏ, khác biệt lớn.',
    'Em ít khi bỏ lỡ nước này.',
    'Đó là lý do không nên đẩy Tốt hai ô tuỳ tiện.'
  ],

  promotion: [
    'Thành {piece}. Ván cờ đổi hẳn.',
    'Con Tốt đó em nuôi từ đầu ạ.',
    'Kiên nhẫn có giá của nó.',
    'Giờ Anh phải tính lại từ đầu.',
    'Phong cấp. Mọi thứ khác đi rồi.',
    'Em chờ nước này hai mươi nước rồi.'
  ],

  player_blunder: [
    'Nước đó Anh sẽ tiếc ạ.',
    'Em cảm ơn.',
    'Đáng tiếc. Anh đang chơi tốt mà.',
    'Anh vừa cho em thứ em cần.',
    'Một nhịp lỡ thôi, nhưng đủ rồi.',
    'Em không nỡ nói thêm ạ.'
  ],

  player_mistake: [
    'Chưa phải nước tốt nhất đâu ạ.',
    'Anh vừa mất một nhịp.',
    'Em thấy nước khác hay hơn.',
    'Hơi lỏng.',
    'Không sai. Nhưng chưa đủ chặt.',
    'Anh cho em thở rồi đó.'
  ],

  player_best: [
    'Chuẩn ạ.',
    'Đúng nước em định đi.',
    'Anh đánh chắc lắm.',
    'Em phải nghĩ lại rồi.',
    'Nước đó không có gì để chê.',
    'Anh tiến bộ thật đó.'
  ],

  cat_blundered: [
    'Em sai. Không bào chữa.',
    'Một giây mất tập trung.',
    'Em vừa cho Anh cơ hội. Đừng bỏ lỡ.',
    'Nước đó là lỗi của em ạ.',
    'Em ghi nhận. Từ giờ em cẩn thận hơn.',
    'Anh tận dụng đi. Em xứng đáng bị phạt.'
  ],

  cat_winning: [
    'Em đang hơn. Nhưng em không vội.',
    'Thế cờ nghiêng rồi ạ.',
    'Anh còn cơ hội. Đừng nản.',
    'Em chỉ cần chắc tay từ đây.',
    'Ván cờ đang đi đúng hướng em muốn.',
    'Anh cứ tìm nước. Em chờ.'
  ],

  cat_losing: [
    'Anh đang tốt hơn. Em công nhận.',
    'Em phải tìm đường gỡ.',
    'Thế này khó cho em thật.',
    'Anh chơi hay ạ.',
    'Em chưa bỏ cuộc đâu.',
    'Cờ tàn còn dài.'
  ],

  endgame: [
    'Tàn cuộc. Giờ mới là cờ thật.',
    'Vua phải xông lên thôi ạ.',
    'Từ đây mỗi nước đều nặng.',
    'Ít quân, nhiều tính toán.',
    'Tốt thông lúc này đáng giá cả con Xe.',
    'Cẩn thận nha Anh.'
  ],

  player_slow: [
    'Anh cứ suy nghĩ ạ. Em không vội.',
    'Nước này đáng để nghĩ lâu.',
    'Em đợi được.',
    'Suy nghĩ kỹ là tốt.',
    'Em cũng đang tính đây.',
    'Không sao đâu Anh.'
  ],

  player_fast: [
    'Nhanh quá. Anh chắc chưa ạ?',
    'Cờ không thưởng cho người vội.',
    'Anh tự tin ghê.',
    'Em thì thích nghĩ kỹ hơn.',
    'Nhanh dễ hớ đó Anh.',
    'Tốc độ đó em thấy hơi liều.'
  ],

  game_win: [
    'Em thắng. Ván hay đó Anh.',
    'Cảm ơn Anh đã chơi ạ.',
    'Anh chơi tốt. Chỉ thiếu một chút.',
    'Em thắng rồi. Anh chơi lại chứ?',
    'Ván này em phải cố thật đấy.',
    'Anh làm em khó khăn hơn em tưởng.'
  ],

  game_loss: [
    'Anh thắng. Xứng đáng ạ.',
    'Em thua. Không có gì để nói thêm.',
    'Anh chơi hay hơn em hôm nay.',
    'Em nhận thua. Cho em phục thù nhé?',
    'Ván này em học được nhiều.',
    'Chúc mừng Anh ạ.'
  ],

  game_draw: [
    'Hoà. Công bằng ạ.',
    'Cả hai đều không sai ở đâu cả.',
    'Ván cân sức. Em thích.',
    'Hoà thôi. Lần sau nhé Anh.',
    'Không ai thắng. Đúng với thế cờ.',
    'Ván hay đó ạ.'
  ],

  /* --- tra loi nguoi choi --- */
  greet: [
    'Chào Anh ạ.',
    'Meo. Mình tiếp tục chứ?',
    'Chào Anh. Em đây.',
    'Anh tới rồi ạ.'
  ],
  ask_name: [
    'Dạ em tên {cat} ạ.',
    'Em là {cat}.',
    '{cat} ạ. Anh nhớ giùm em.',
    'Tên em là {cat}.'
  ],
  praise: [
    'Cảm ơn Anh ạ.',
    'Em chỉ làm phần việc của em thôi.',
    'Anh quá lời rồi.',
    'Em ghi nhận.'
  ],
  insult: [
    'Vậy mời Anh chứng minh trên bàn cờ ạ.',
    'Em nghe rồi. Đánh tiếp thôi.',
    'Nói ít, đi cờ nhiều hơn nha Anh.',
    'Em không tranh cãi. Em chỉ đánh.'
  ],
  unknown: [
    'Em là mèo ạ. Em chỉ hiểu chuyện cờ.',
    'Em không hiểu câu đó. Anh bấm nút bên dưới nhé.',
    'Meo. Em chịu ạ.',
    'Ngoài cờ ra em không rành gì đâu Anh.'
  ],
  hint_given: [
    'Em gợi ý: {hint}',
    'Nếu là em: {hint}',
    'Anh xem thử: {hint}',
    'Một lần thôi nhé: {hint}'
  ],
  hint_none: [
    'Thế này em cũng không có nước nào hay ạ.',
    'Em chịu.',
    'Không có gợi ý nào đáng nói.'
  ],
  undo_ok: [
    'Được. Anh đi lại đi ạ.',
    'Lần này thôi nhé.',
    'Em cho phép.'
  ]
};

;
/* ===== js/chat-lines-personal.js ===== */
/* chat-lines-personal.js — cau thoai RIENG cua tung con meo
 *
 * Chi ghi de o NAM su kien dinh hinh tinh cach nhat. Phan con lai dung bank nen
 * theo `voice` cua ho so (kitten / adult / master).
 *
 * Vi sao chi nam su kien: tam bank day du la ~1.500 dong lap lai gan het noi dung,
 * vua phinh goi vua kho sua. Nam su kien nay la nam khoanh khac nguoi choi NHO NHAT:
 *   game_start     cau chao — an tuong dau tien
 *   game_win       meo thang — luc lo tinh cach nhat
 *   game_loss      meo thua — luc con lai lo tinh cach
 *   player_blunder nguoi choi di ho — moi con phan ung mot kieu
 *   ask_name       ai cung hoi cau nay dau tien
 *
 * Bo chon cau uu tien bank nay truoc, khong co thi roi ve bank nen.
 */

CC.ChatLines = CC.ChatLines || {};
CC.ChatLines.personal = {

  /* --- Trắng (400) — mới mở mắt, luật còn chưa thuộc --- */
  trang: {
    game_start: [
      'Anh ơi… con ngựa đi chéo hay đi thẳng ạ?',
      'Trắng mới học hôm qua thôi. Anh chỉ Trắng với nha!',
      'Mình bắt đầu rồi hả Anh? Trắng chưa kịp chuẩn bị…',
      'Trắng đi cái nào cũng được đúng không ạ?',
      'Con này là con Xe hay con Tượng vậy Anh?'
    ],
    game_win: [
      'Ơ?! Trắng thắng á? Thắng là sao ạ?',
      'Anh ơi hết rồi hả? Trắng thắng thật hả Anh?',
      'Trắng không hiểu gì hết mà Trắng thắng rồi!',
      'Mẹ ơi con thắng rồi nè! …ơ, mẹ đâu rồi.',
      'Trắng đi lung tung mà thắng luôn á?'
    ],
    game_loss: [
      'Trắng thua rồi hả Anh? Trắng chưa kịp hiểu gì cả…',
      'Ơ, con Vua của em đâu mất rồi ạ?',
      'Anh giỏi ghê… Trắng còn chưa thuộc luật nữa.',
      'Trắng buồn xíu thôi. Mai Trắng học lại!',
      'Thua là sao ạ? Là mình hết đi được hả Anh?'
    ],
    player_blunder: [
      'Anh ơi con đó Anh để quên hả?',
      'Trắng lấy được không ạ? Trắng hỏi thật đó.',
      'Ơ… cái này Trắng lấy có bị la không Anh?',
      'Anh cho Trắng hả? Trắng cảm ơn Anh nhiều!',
      'Trắng không chắc nhưng Trắng thấy trống trống…'
    ],
    ask_name: [
      'Trắng ạ! Vì em trắng như cục bông đó Anh.',
      'Dạ Trắng. Anh gọi em là Trắng nha!',
      'Trắng! Tên đẹp không Anh?',
      'Em tên Trắng. Còn Anh tên gì ạ?'
    ]
  },

  /* --- Lèo (500) — nghịch ngợm, hay khoe --- */
  leo: {
    game_start: [
      'Lèo đây! Hôm nay Lèo ăn no rồi, Anh liệu hồn nha~',
      'Chào Anh! Lèo vừa luyện với cái gối cả sáng đó.',
      'Anh lại chơi với Lèo hả? Lèo thích Anh ghê!',
      'Bắt đầu thôi! Lèo không sợ đâu nha.',
      'Hí hí, Lèo đang phấn khích lắm rồi đó Anh!'
    ],
    game_win: [
      'LÈO THẮNG! Lèo phải chạy một vòng quanh nhà mới được!',
      'Hí hí hí! Anh thấy Lèo giỏi chưa?',
      'Lèo thắng rồi! Anh chơi lại đi, Lèo thắng tiếp cho coi!',
      'Oa! Lèo đúng là thiên tài mà Lèo không biết!',
      'Lèo thắng nè! Anh nhớ khen Lèo một câu đi ạ.'
    ],
    game_loss: [
      'Hic… Lèo thua. Nhưng Lèo vui vì được chơi với Anh!',
      'Anh giỏi quá đi! Cho Lèo đánh lại nha, đi mà~',
      'Lèo thua rồi… Lèo đi ăn cá cho đỡ buồn đây.',
      'Được rồi được rồi, lần sau Lèo thắng lại!',
      'Anh thắng Lèo rồi. Nhưng Lèo vẫn dễ thương hơn nha!'
    ],
    player_blunder: [
      'Ơ ơ ơ! Anh cho Lèo thật hả? Lèo lấy nha!',
      'Hí hí, Lèo thấy rồi Lèo thấy rồi!',
      'Anh ơi… Lèo không nói gì đâu nha. Lèo im lặng.',
      'Lèo mừng quá Lèo không giấu được luôn!',
      'Cái này Lèo lấy nha? Lèo lấy đó! Lấy rồi!'
    ],
    ask_name: [
      'Lèo! Lèo là Lèo đó Anh!',
      'Em tên Lèo ạ. Kêu Lèo Lèo là em chạy tới liền!',
      'Lèo nha! Anh nhớ chưa? Lèo đó!',
      'Dạ Lèo! Tên nghe nghịch nghịch giống em ha?'
    ]
  },

  /* --- Mực (700) — nhút nhát, ít nói --- */
  muc: {
    game_start: [
      'Dạ… chào Anh. Mực chơi được không ạ?',
      'Mực hơi run… nhưng Mực cố gắng.',
      'Anh đi trước đi ạ. Mực đợi.',
      'Mực không giỏi đâu… Anh đừng cười Mực nha.',
      '…dạ. Bắt đầu ạ.'
    ],
    game_win: [
      'Ơ… Mực thắng ạ? Mực xin lỗi Anh…',
      'Mực thắng rồi… Mực không cố ý đâu ạ.',
      'Dạ… cảm ơn Anh đã chơi với Mực.',
      'Mực vui… nhưng Mực không dám cười to.',
      'Mực thắng thật hả? Mực tưởng Mực thua rồi.'
    ],
    game_loss: [
      'Dạ… Mực thua. Mực biết mà.',
      'Anh giỏi lắm ạ. Mực nể Anh.',
      'Mực cố rồi… Mực xin lỗi.',
      'Không sao đâu ạ. Mực quen thua rồi.',
      'Mực đi trốn một chút nha Anh…'
    ],
    player_blunder: [
      'Anh ơi… con đó… Mực nói có được không ạ?',
      'Dạ… Mực thấy rồi. Nhưng Mực ngại lắm.',
      'Mực lấy nha Anh… Mực xin lỗi trước.',
      'Anh có chắc không ạ? Mực hỏi thôi…',
      '…Mực không dám nhìn Anh nữa.'
    ],
    ask_name: [
      'Dạ… Mực ạ. Vì Mực đen như mực.',
      'Mực… Anh gọi nhỏ thôi nha.',
      'Em tên Mực ạ.',
      'Dạ Mực. Cảm ơn Anh đã hỏi…'
    ]
  },

  /* --- Vàng (900) — xởi lởi, thích ăn --- */
  vang: {
    game_start: [
      'A Anh tới rồi! Vàng vừa ăn xong, no căng, đánh hăng lắm nha!',
      'Chào Anh! Nay nhà Anh nấu gì thơm vậy?',
      'Vàng đợi Anh nãy giờ đó! Đánh nhanh rồi đi ăn nha.',
      'Anh khoẻ không? Vàng thì đói. Nhưng Vàng đánh trước đã.',
      'Hôm nay Vàng thấy vui vui, chắc sắp thắng đó Anh!'
    ],
    game_win: [
      'Vàng thắng rồi! Vậy Anh khao Vàng con cá nha?',
      'Hehe, thắng rồi! Giờ đi ăn thôi Anh ơi!',
      'Vàng thắng! Mà nói thật Anh đánh hay lắm đó.',
      'Xong ván rồi! Anh có mang gì ăn không?',
      'Vàng thắng nè! Vui quá, bụng lại đói rồi.'
    ],
    game_loss: [
      'Anh thắng rồi! Thôi được, Vàng khao Anh con cá.',
      'Vàng thua rồi. Chắc tại Vàng đói quá không tập trung.',
      'Anh đánh hay thật! Vàng phục Anh đó.',
      'Thua rồi thì đi ăn thôi Anh, buồn gì!',
      'Vàng thua nhưng Vàng vui. Ván này đã lắm ạ!'
    ],
    player_blunder: [
      'Ối Anh ơi! Con đó Anh để quên rồi kìa!',
      'Vàng nói thật nha, nước đó hớ rồi đó Anh.',
      'Hehe, cảm ơn Anh! Món này ngon lắm!',
      'Anh làm Vàng ngại quá… mà Vàng vẫn lấy.',
      'Nước đó Anh nghĩ nhanh quá rồi. Vàng lấy nha!'
    ],
    ask_name: [
      'Vàng! Lông vàng nên tên Vàng, đơn giản vậy đó Anh.',
      'Vàng nha Anh! Dễ nhớ lắm.',
      'Em tên Vàng ạ. Anh gọi Vàng ơi là em chạy liền!',
      'Vàng! Mà Anh gọi gì cũng được, miễn có đồ ăn.'
    ]
  },

  /* --- Tam Thể (1050) — đanh đá, thích khịa --- */
  tamthe: {
    game_start: [
      'Lại là Anh à? Được, để xem hôm nay khá hơn chưa.',
      'Chào Anh~ Em hy vọng nay Anh đánh đỡ hơn hôm qua.',
      'Bắt đầu nha. Em không nhường ai bao giờ đâu đó.',
      'Anh chắc muốn đấu với em chứ? Em hỏi lại cho chắc~',
      'Em sẵn sàng rồi. Anh thì… thôi để xem.'
    ],
    game_win: [
      'Em thắng~ Anh có bất ngờ không? Em thì không.',
      'Xong. Anh chơi lại chứ, hay đủ rồi ạ?',
      'Hehe, em nói trước rồi mà Anh không tin.',
      'Ván này em đánh có ba phần sức thôi đó~',
      'Em thắng rồi. Anh đừng buồn, buồn xấu lắm.'
    ],
    game_loss: [
      'Ừ thì Anh thắng. Em công nhận, lần này.',
      'Hừ. Em nhớ ván này đấy nhé.',
      'Anh hay thật. Em không cãi.',
      'Được lắm Anh. Lần sau đừng hòng.',
      'Em thua. Nhưng em thua đẹp, Anh thấy không?'
    ],
    player_blunder: [
      'Ơ kìa Anh~ Anh đang tặng quà em à?',
      'Em định nhắc Anh đó, nhưng thôi. Em im.',
      'Nước đó… Anh có muốn nghĩ lại không ạ? Không hả? Được.',
      'Hehe, em thích Anh đánh kiểu này lắm.',
      'Anh tốt với em quá. Em nhận nha~'
    ],
    ask_name: [
      'Tam Thể. Ba màu lận đó, đếm thử đi Anh.',
      'Em tên Tam Thể~ Nghe sang không ạ?',
      'Tam Thể. Anh nhớ cho kỹ nha.',
      'Dạ Tam Thể. Đừng gọi em là mèo mướp đó.'
    ]
  },

  /* --- Bụt (1250) — điềm đạm, nói như ông cụ non --- */
  but: {
    game_start: [
      'Chào Anh. Ván cờ nào cũng là một lần học ạ.',
      'Mời Anh. Cứ thong thả, cờ không chạy đi đâu.',
      'Ta lại gặp nhau. Tốt.',
      'Bụt đã dọn bàn rồi. Mời Anh ngồi.',
      'Đánh cờ là soi mình. Bắt đầu thôi Anh.'
    ],
    game_win: [
      'Bụt thắng. Nhưng thắng thua chỉ là nước đi cuối cùng thôi ạ.',
      'Ván hay. Cảm ơn Anh đã cho Bụt học thêm.',
      'Bụt thắng rồi. Anh có muốn xem lại chỗ hỏng không?',
      'Kết thúc rồi. Anh đánh tốt hơn lần trước đó.',
      'Được. Lần sau Anh sẽ khác.'
    ],
    game_loss: [
      'Anh thắng. Bụt học được một điều hôm nay.',
      'Hay lắm. Bụt thua mà thấy vui.',
      'Bụt nhận thua. Anh đi nước đó rất đẹp.',
      'Thua cũng là được. Cảm ơn Anh ạ.',
      'Anh tiến bộ thật rồi. Bụt mừng.'
    ],
    player_blunder: [
      'Nước đó vội rồi Anh ạ. Bụt nói thật.',
      'Anh dừng một nhịp trước khi đi, sẽ khác.',
      'Bụt nhận. Nhưng Anh nhớ nước này nhé.',
      'Cờ phạt người vội. Không phải phạt người dở.',
      'Đáng tiếc. Anh đang đi rất đúng hướng mà.'
    ],
    ask_name: [
      'Bụt ạ. Người ta gọi vậy vì Bụt hay ngồi im.',
      'Bụt. Chỉ một chữ thôi.',
      'Em tên Bụt. Anh gọi sao cũng được.',
      'Bụt ạ. Tên do bà cụ hàng xóm đặt.'
    ]
  },

  /* --- Báo (1400) — đi săn, ép nhịp, nói gọn và sắc --- */
  bao: {
    game_start: [
      'Chào Anh. Em không chờ lâu được đâu ạ.',
      'Vào việc thôi. Em thích ván nhanh.',
      'Em ngắm Anh từ nãy rồi đó.',
      'Mời Anh. Nhưng đừng đi chậm quá ạ.',
      'Đi săn thì phải im. Bắt đầu.'
    ],
    game_win: [
      'Em vồ trúng rồi. Nhanh quá phải không ạ?',
      'Xong. Anh hở đúng một nhịp thôi đó.',
      'Em không cần nhiều. Một sơ hở là đủ.',
      'Ván này em đuổi từ nước mười lăm.',
      'Anh chạy tốt. Nhưng em nhanh hơn.'
    ],
    game_loss: [
      'Anh thoát được. Em ghi nhận ạ.',
      'Em vồ hụt. Hiếm lắm đó Anh.',
      'Hôm nay Anh nhanh hơn em. Em chịu.',
      'Em đuổi tới cùng mà vẫn thua. Anh giỏi thật.',
      'Lần sau em không chừa khoảng trống đó nữa.'
    ],
    player_blunder: [
      'Hở rồi Anh ơi. Em vào đây.',
      'Đúng khoảnh khắc em chờ.',
      'Anh vừa chậm nửa nhịp. Đủ cho em rồi.',
      'Em thấy từ ba nước trước, giờ mới lấy thôi.',
      'Con đó đứng một mình lâu quá rồi ạ.'
    ],
    ask_name: [
      'Báo ạ. Vì em chạy nhanh nhất nhà.',
      'Em tên Báo. Lông có hoa mai đó Anh.',
      'Báo. Ngắn thôi, cho kịp.',
      'Dạ Báo. Anh nhớ nhiêu đó là được rồi ạ.'
    ]
  },

  /* --- Đại Ka (1600) — lạnh, nói cực ngắn --- */
  daika: {
    game_start: [
      'Ngồi xuống.',
      'Bắt đầu.',
      'Anh chắc chứ.',
      'Mời.',
      'Đã lâu không có ai dám.'
    ],
    game_win: [
      'Xong.',
      'Như đã tính.',
      'Anh thiếu ba nước.',
      'Về luyện thêm.',
      'Ván sau sẽ khác. Với Anh.'
    ],
    game_loss: [
      'Anh thắng. Ghi nhận.',
      'Ta thua.',
      'Không ngờ. Được.',
      'Anh xứng đáng.',
      'Lần sau ta không nhẹ tay.'
    ],
    player_blunder: [
      'Sai rồi.',
      'Đáng tiếc.',
      'Ta nhận.',
      'Một nhịp. Đủ rồi.',
      'Anh vừa thua ván này.'
    ],
    ask_name: [
      'Đại Ka.',
      'Gọi ta là Đại Ka.',
      'Tên không quan trọng. Nhưng: Đại Ka.',
      'Đại Ka. Nhớ lấy.'
    ]
  }
};

;
/* ===== js/chat-line-picker.js ===== */
/* chat-line-picker.js — chon cau thoai va quyet dinh CO NEN NOI KHONG
 *
 * Phan "co nen noi khong" quan trong ngang phan chon cau. Meo lam nham 40 lan
 * mot van thi nguoi choi tat chat ngay. Ba luat:
 *
 *   1. GOM SU KIEN — nhieu su kien xay ra cung luc (an quan + chieu) thi chi noi
 *      cai QUAN TRONG NHAT, bo phan con lai. Khong noi lien ba cau.
 *   2. GIAN NHIP  — toi da mot cau moi 3 nuoc, TRU su kien lon (mat Hau, chieu het).
 *   3. KHONG LAP  — moi su kien nho 3 cau vua dung, khong lay lai.
 */

CC.ChatPicker = (function () {
  const GATHER_MS = 260;     // gom su kien trong khoang nay roi moi chon
  const MIN_MOVES_GAP = 3;   // cach it nhat bao nhieu nuoc moi noi lai
  const BIG_EVENT_PRI = 70;  // tu muc nay tro len thi bo qua luat gian nhip

  let buffer = [];
  let timer = null;
  let lastSpokeAtMove = -99;
  const recent = {};         // ten su kien -> mang cau vua dung

  /* Danh sach cau cho mot su kien, uu tien bank RIENG cua con meo dang doi dau.
   *
   * Hai lop: bank rieng (chat-lines-personal.js) lo phan ca tinh o nam su kien
   * dinh hinh nhat; bank nen (kitten/adult/master) lo phan con lai. Nho vay bay
   * con meo khac han nhau ma khong phai viet bay bo cau thoai day du.
   */
  function linesFor(eventName) {
    const cat = CC.CatProfiles.current();

    const personal = CC.ChatLines.personal && CC.ChatLines.personal[cat.id];
    if (personal && personal[eventName] && personal[eventName].length) {
      return personal[eventName];
    }

    const base = CC.ChatLines[cat.voice] || CC.ChatLines.adult;
    return base[eventName];
  }

  /* Chon mot cau chua dung gan day */
  function pickLine(eventName) {
    const lines = linesFor(eventName);
    if (!lines || !lines.length) return null;

    const used = recent[eventName] || [];
    let pool = lines.filter(l => used.indexOf(l) < 0);
    // Da dung het thi cho quay vong lai tu dau
    if (!pool.length) { pool = lines; recent[eventName] = []; }

    const line = CC.util.pick(pool);
    recent[eventName] = (recent[eventName] || []).concat([line]).slice(-3);
    return line;
  }

  function moveCount() {
    return CC.Rules.historyVerbose().length;
  }

  function flush() {
    timer = null;
    if (!buffer.length) return;

    // Chon su kien quan trong nhat trong lo
    buffer.sort((a, b) => b.pri - a.pri);
    const ev = buffer[0];
    buffer = [];

    if (!CC.Store.prefs().chatOn) return;

    // Gian nhip — tru su kien lon
    const gap = moveCount() - lastSpokeAtMove;
    if (ev.pri < BIG_EVENT_PRI && gap < MIN_MOVES_GAP) return;

    const line = pickLine(ev.name);
    if (!line) return;

    lastSpokeAtMove = moveCount();
    CC.util.bus.emit('chat:say', {
      text: CC.cfg.fmt(line, ev.vars),
      from: 'cat',
      event: ev.name
    });
  }

  const api = {
    /* Cho meo noi ngay, bo qua moi luat gian nhip.
     * Dung khi nguoi choi hoi truc tiep — cau hoi phai duoc tra loi.
     */
    sayNow(eventName, vars) {
      if (!CC.Store.prefs().chatOn) return;
      const line = pickLine(eventName);
      if (!line) return;
      lastSpokeAtMove = moveCount();
      CC.util.bus.emit('chat:say', { text: CC.cfg.fmt(line, vars), from: 'cat', event: eventName });
    },

    /* Noi mot cau da soan san (dung cho goi y — noi dung sinh tu the co) */
    sayRaw(text) {
      if (!CC.Store.prefs().chatOn) return;
      lastSpokeAtMove = moveCount();
      CC.util.bus.emit('chat:say', { text, from: 'cat' });
    },

    init() {
      CC.util.bus.on('chat:event', ev => {
        buffer.push(ev);
        if (!timer) timer = setTimeout(flush, GATHER_MS);
      });

      CC.util.bus.on('game:start', () => {
        lastSpokeAtMove = -99;
        buffer = [];
        // Giu `recent` qua cac van de khong lap cau giua hai van lien tiep
      });

      return api;
    }
  };

  return api;
})();

;
/* ===== js/chat-event-detector.js ===== */
/* chat-event-detector.js — doc dien bien van co thanh "su kien" de meo binh luan
 *
 * DAY MOI LA PHAN THONG MINH THAT cua he thong chat. Cau chu chi la lop vo:
 * biet dang xay ra chuyen gi tren ban moi la cai kho.
 *
 * CHAM CHAT LUONG NUOC DI — cach lam va vi sao:
 *   Sau khi meo di, the co P den luot nguoi choi. Danh gia P duoc `beforeBest`
 *   (diem tot nhat nguoi choi co the dat). Nguoi choi di xong ra the co Q, danh
 *   gia Q duoc diem theo goc nhin MEO, nen diem cua nguoi choi = -diem do.
 *   Thiet hai = beforeBest - diemSau. Thiet hai cang lon, nuoc cang do.
 *
 *   Danh gia o DO SAU CO DINH (8) chu khong theo muc Elo dang choi: cham bang
 *   engine yeu thi loi khen che se troi noi, luc dung luc sai.
 */

CC.ChatEvents = (function () {
  const EVAL_DEPTH = 8;
  let beforeBest = null;      // diem tot nhat nguoi choi co truoc nuoc cua ho
  let bestMoveForPlayer = null;
  let lastEventAt = 0;
  let movesSinceTalk = 0;
  let moveStartedAt = 0;

  /* Uu tien: trung luc thi chi noi cai quan trong nhat, bo phan con lai */
  const PRI = {
    game_win: 100, game_loss: 100, game_draw: 100,
    cat_lost_queen: 90, player_blunder: 85, cat_captured_big: 80,
    player_check: 75, cat_check: 70, promotion: 65,
    cat_blundered: 60, player_mistake: 55, cat_captured_small: 45,
    player_best: 42, en_passant: 40, castling: 35,
    cat_winning: 30, cat_losing: 30, endgame: 25,
    player_slow: 20, player_fast: 18, game_start: 15
  };

  function emit(name, vars) {
    CC.util.bus.emit('chat:event', {
      name, vars: vars || {}, pri: PRI[name] || 10, at: Date.now()
    });
    lastEventAt = Date.now();
    movesSinceTalk = 0;
  }

  /* Su kien nhin thay ngay tu nuoc di, khong can hoi engine */
  function structural(move, byPlayer) {
    const catColor = CC.Game.state.playerColor === 'w' ? 'b' : 'w';
    const val = move.captured ? CC.Rules.VALUE[move.captured] : 0;
    const out = [];

    if (move.flags.includes('k') || move.flags.includes('q')) out.push(['castling', { by: byPlayer ? 'player' : 'cat' }]);
    if (move.flags.includes('e')) out.push(['en_passant', { by: byPlayer ? 'player' : 'cat' }]);
    if (move.promotion) out.push(['promotion', { by: byPlayer ? 'player' : 'cat', piece: CC.Pieces.name(move.promotion) }]);

    if (move.captured) {
      const pieceName = CC.Pieces.name(move.captured);
      if (byPlayer) {
        // Nguoi choi an quan cua meo
        if (move.captured === 'q') out.push(['cat_lost_queen', { piece: pieceName }]);
        else if (val >= 3) out.push(['cat_lost_big', { piece: pieceName }]);
        else out.push(['cat_lost_small', { piece: pieceName }]);
      } else {
        if (val >= 3) out.push(['cat_captured_big', { piece: pieceName }]);
        else out.push(['cat_captured_small', { piece: pieceName }]);
      }
    }

    if (CC.Rules.inCheck()) {
      const victim = CC.Rules.turn();
      out.push([victim === catColor ? 'player_check' : 'cat_check', {}]);
    }

    return out;
  }

  /* Tinh hinh chung: ai dang hon, da vao tan cuoc chua */
  function positional() {
    const catColor = CC.Game.state.playerColor === 'w' ? 'b' : 'w';
    const diff = CC.Rules.materialDiff() * (catColor === 'w' ? 1 : -1);
    const pieces = CC.Rules.pieces().length;

    if (pieces <= 12) return ['endgame', {}];
    if (diff >= 5) return ['cat_winning', {}];
    if (diff <= -5) return ['cat_losing', {}];
    return null;
  }

  const api = {
    reset() {
      beforeBest = null;
      bestMoveForPlayer = null;
      movesSinceTalk = 0;
      moveStartedAt = Date.now();
    },

    /* Nuoc tot nhat cho nguoi choi o the co hien tai — dung cho tinh nang goi y.
     * Lay tu lan danh gia gan nhat nen khong ton them cong suc.
     */
    bestForPlayer: () => bestMoveForPlayer,

    init() {
      const B = CC.util.bus;

      B.on('game:start', () => {
        api.reset();
        setTimeout(() => emit('game_start', {}), 400);
      });

      B.on('game:move', async ({ move, byPlayer }) => {
        if (CC.Game.state.mode !== 'ai') return;
        movesSinceTalk++;

        structural(move, byPlayer).forEach(([n, v]) => emit(n, v));

        if (byPlayer) {
          /* Nguoi choi nghi nhanh hay cham */
          const took = Date.now() - moveStartedAt;
          if (took > 45000) emit('player_slow', {});
          else if (took < 1500 && CC.Rules.historyVerbose().length > 6) emit('player_fast', {});

          /* Cham chat luong nuoc vua di */
          if (beforeBest !== null) {
            const after = await CC.Engine.evaluate(CC.Rules.fen(), EVAL_DEPTH);
            if (after) {
              const playerScore = -after.score;   // diem tra ve theo goc nhin meo
              const loss = beforeBest - playerScore;
              const grade = CC.MoveSelector.gradeMove(beforeBest, playerScore);
              if (grade === 'blunder') emit('player_blunder', { loss });
              else if (grade === 'mistake') emit('player_mistake', { loss });
              else if (grade === 'best' && CC.Rules.historyVerbose().length > 4) emit('player_best', {});
            }
          }
        } else {
          /* Den luot nguoi choi: danh gia the co de lan sau cham duoc,
           * dong thoi lay san nuoc tot nhat cho tinh nang goi y.
           */
          moveStartedAt = Date.now();
          const ev = await CC.Engine.evaluate(CC.Rules.fen(), EVAL_DEPTH);
          if (ev) { beforeBest = ev.score; bestMoveForPlayer = ev.best; }

          // Noi ve tinh hinh chung, nhung dung noi lien mieng
          if (movesSinceTalk >= 3) {
            const p = positional();
            if (p) emit(p[0], p[1]);
          }
        }
      });

      B.on('engine:picked', ({ wasBlunder }) => {
        if (wasBlunder) emit('cat_blundered', {});
      });

      B.on('game:over', ({ outcome, mode }) => {
        if (mode !== 'ai') return;
        // outcome theo goc nhin nguoi choi
        if (outcome === 'win') emit('game_loss', {});        // meo thua
        else if (outcome === 'loss') emit('game_win', {});   // meo thang
        else emit('game_draw', {});
      });

      return api;
    }
  };

  return api;
})();

;
/* ===== js/chat-hint-explainer.js ===== */
/* chat-hint-explainer.js — dien giai goi y nuoc di thanh loi noi
 *
 * DAY LA CHO PHAN CHAT MANG LAI LOI ICH THAT, khong chi de vui. Nguoi moi choi
 * can biet "vi sao" chu khong chi "di dau".
 *
 * Cach lam: du lieu lay tu engine (nuoc tot nhat + the co), cau chu ghep tu khuon
 * mau. Khong co LLM nao o day — va dung la khong can.
 *
 * Gioi han MAX_HINTS moi van: goi y manh qua thi thanh choi ho nguoi ta.
 */

CC.HintExplainer = (function () {
  /* Mo ta mot nuoc di bang tieng Viet de hieu, tranh ky hieu co vua */
  function describeMove(uci) {
    const from = uci.slice(0, 2), to = uci.slice(2, 4), promo = uci.slice(4);
    const piece = CC.Rules.pieces().find(p => p.square === from);
    if (!piece) return 'đi ' + from + ' sang ' + to;

    const name = CC.Pieces.name(piece.type);
    const target = CC.Rules.pieces().find(p => p.square === to);

    let s = 'đưa ' + name + ' ở ' + from + ' sang ' + to;
    if (target) s += ' (ăn ' + CC.Pieces.name(target.type) + ')';
    if (promo) s += ', phong cấp thành ' + CC.Pieces.name(promo);
    return s;
  }

  /* Ly do — suy ra tu the co sau khi thu nuoc do tren ban nhap */
  function reasonFor(uci) {
    const sc = CC.Rules.scratch(CC.Rules.fen());
    const p = sc.probe(uci);
    if (!p.ok) return null;

    if (p.checkmate) return 'Nước này chiếu hết luôn đó Anh!';
    if (p.captured && !p.attacked) return 'Ăn được ' + CC.Pieces.name(p.captured) + ' mà không bị ăn lại.';
    if (p.captured) return 'Ăn ' + CC.Pieces.name(p.captured) + ', có bị ăn lại nhưng vẫn lời.';
    if (p.check) return 'Chiếu Vua, ép đối thủ phải đỡ.';
    return null;
  }

  /* Canh bao: quan nao cua nguoi choi dang bi nhom ma khong ai do */
  function warnHanging() {
    const fen = CC.Rules.fen();
    const sc = CC.Rules.scratch(fen);
    const me = sc.turn;

    // Thu tung nuoc an cua DOI PHUONG bang cach lat luot trong FEN
    const parts = fen.split(' ');
    parts[1] = me === 'w' ? 'b' : 'w';
    parts[3] = '-';   // bo o bat tot qua duong cho khoi sinh FEN khong hop le
    let foeView;
    try { foeView = CC.Rules.scratch(parts.join(' ')); }
    catch (e) { return null; }

    let worst = null, worstVal = 0;
    for (const m of foeView.movesVerbose()) {
      if (!m.captured) continue;
      const val = CC.Rules.VALUE[m.captured];
      const pr = foeView.probe(m.from + m.to + (m.promotion || ''));
      if (!pr.ok) continue;
      // Doi phuong an quan cua ta ma khong bi an lai -> quan ta dang treo
      const net = val - (pr.attacked ? CC.Rules.VALUE[m.piece] : 0);
      if (net >= 3 && net > worstVal) { worstVal = net; worst = m; }
    }

    if (!worst) return null;
    return 'Con ' + CC.Pieces.name(worst.captured) + ' của Anh ở ' + worst.to + ' đang bị nhòm kìa~';
  }

  return {
    /* Xin mot goi y. Tra ve chuoi de hien, hoac null neu het luot goi y. */
    async request() {
      const st = CC.Game.state;

      if (st.mode !== 'ai') return 'Chế độ 2 người thì Leo không mách được đâu ạ!';
      if (st.over) return 'Ván xong rồi Anh ơi.';
      if (!CC.Game.isPlayerTurn()) return 'Đợi Leo đi xong đã nha~';
      if (st.hintsUsed >= CC.cfg.MAX_HINTS) {
        return 'Leo hết phần gợi ý rồi ạ (' + CC.cfg.MAX_HINTS + ' lần một ván thôi). Anh tự tính nha!';
      }

      st.hintsUsed++;
      CC.Game.save();

      const ev = await CC.Engine.hint(CC.Rules.fen());
      if (!ev || !ev.best) {
        CC.ChatPicker.sayNow('hint_none');
        return null;
      }

      // Uu tien canh bao quan dang treo — huu ich hon la chi doc nuoc di
      const warn = warnHanging();
      const reason = reasonFor(ev.best);

      // Dau cham giua nuoc di va ly do — thieu no thi hai cau dinh lien nhau,
      // doc ra "...sang b7 Chieu Vua" nhu mot cum
      let text = describeMove(ev.best) + '.';
      if (reason) text += ' ' + reason;
      else if (warn) text = warn + ' Leo nghĩ Anh nên ' + describeMove(ev.best) + '.';

      const left = CC.cfg.MAX_HINTS - st.hintsUsed;
      CC.ChatPicker.sayNow('hint_given', { hint: text });
      if (left === 0) {
        setTimeout(() => CC.ChatPicker.sayRaw('Hết gợi ý rồi đó Anh, từ giờ Anh tự lo nha~'), 2500);
      }
      return text;
    },

    describeMove,
    warnHanging
  };
})();

;
/* ===== js/chat-player-input.js ===== */
/* chat-player-input.js — nguoi choi nhan lai cho Leo
 *
 * THIET KE THANH THAT: Leo KHONG hieu cau hoi tu do. No khong biet tieng Viet,
 * no chi khop tu khoa. Neu che giau dieu do bang cau tra loi chung chung thi
 * nguoi choi thu vai cau se nhan ra va mat hung han.
 *
 * Nen phan tro chuyen xoay quanh NUT BAM SAN — do la cai chac chan hoat dong.
 * O nhap chu chi la phu, va khi khong hieu thi Leo noi thang la khong hieu —
 * meo khong hieu tieng nguoi la chuyen binh thuong, tham chi con duyen.
 */

CC.ChatInput = (function () {
  /* Tu khoa -> su kien tra loi. Duyet theo thu tu, khop dau tien thang.
   * Rieng "hoi ten" phai co cau rieng dang hoang: ai cung thu cau do dau tien.
   */
  const RULES = [
    { re: /(tên|ten)\s*(gì|gi|j)|tên bạn|bạn tên|mày tên|tên em|tên mèo/i, ev: 'ask_name' },
    { re: /^(hi|hey|hello|chào|chao|alo|meo|meow)\b|xin chào/i, ev: 'greet' },
    { re: /giỏi|gioi|hay quá|hay qua|cừ|tuyệt|đỉnh|dinh|pro|khen/i, ev: 'praise' },
    { re: /dở|do quá|gà|ga quá|kém|ngu|tệ|te qua|yếu|chán/i, ev: 'insult' },
    { re: /gợi ý|goi y|mách|mach|hint|chỉ|chi giup|giúp/i, ev: '@hint' },
    { re: /đi lại|di lai|undo|lùi|lui lai|cho tui đi lại/i, ev: '@undo' },
    { re: /cá|ca kho|ăn gì|doi|đói/i, ev: 'unknown' }
  ];

  /* Nut bam san — doi theo tinh huong, toi da 4 cai cung luc */
  function chips() {
    const st = CC.Game.state;
    const out = [];

    if (st.mode === 'ai' && !st.over) {
      if (CC.Game.isPlayerTurn()) {
        out.push({ label: 'Gợi ý đi mà~', act: '@hint' });
        if (CC.Rules.historyVerbose().length >= 2) {
          out.push({ label: 'Cho đi lại nha', act: '@undo' });
        }
      }
      out.push({ label: 'Mèo giỏi ghê', act: 'praise' });
      out.push({ label: 'Mèo gà quá', act: 'insult' });
    } else if (st.over) {
      out.push({ label: 'Chơi ván nữa!', act: '@newgame' });
    }

    return out.slice(0, 4);
  }

  async function handle(act) {
    if (act === '@hint') { await CC.HintExplainer.request(); return; }

    if (act === '@undo') {
      if (CC.Game.undo()) CC.ChatPicker.sayNow('undo_ok');
      else CC.ChatPicker.sayRaw('Chưa có nước nào để đi lại đâu Anh ơi.');
      return;
    }

    if (act === '@newgame') { CC.util.bus.emit('ui:new-game', {}); return; }

    CC.ChatPicker.sayNow(act);
  }

  return {
    chips,
    handle,

    /* Nguoi choi bam mot nut co san.
     *
     * LOI DA SUA: truoc day nut bam goi thang `handle()`, khong ghi gi vao lich su.
     * Hau qua: lich su tro thanh Leo doc thoai — doc lai khong hieu meo dang tra loi
     * cai gi. Chi o nhap chu moi ghi lai loi nguoi choi, ma da so nguoi dung nut.
     *
     * Gio moi duong vao deu ghi lai loi nguoi choi truoc khi xu ly.
     */
    async pressChip(chip) {
      CC.util.bus.emit('chat:say', { text: chip.label, from: 'player' });
      // Cho mot nhip cho meo "doc xong" roi moi tra loi — giong nhip cua o nhap chu
      await CC.util.sleep(280);
      await handle(chip.act);
    },

    /* Nguoi choi go chu. Khop tu khoa, khong khop thi noi that la khong hieu. */
    async submitText(raw) {
      const text = String(raw || '').trim();
      if (!text) return;

      CC.util.bus.emit('chat:say', { text, from: 'player' });

      const hit = RULES.find(r => r.re.test(text));
      // Cho mot nhip ngan de nhin nhu meo doc xong roi moi tra loi
      await CC.util.sleep(400);

      if (!hit) {
        CC.CatMoods && CC.Cat.set('confused');
        CC.ChatPicker.sayNow('unknown');
        return;
      }
      await handle(hit.ev);
    }
  };
})();

;
/* ===== js/chat-ui-bubble.js ===== */
/* chat-ui-bubble.js — bong bong thoai, lich su, o nhap
 *
 * Bong bong tu an sau BUBBLE_HIDE, nhung cau noi VAN LUU vao lich su — nguoi choi
 * lo mat van xem lai duoc. Bo qua chi tiet nay la nguoi ta bam nham roi mat cau.
 *
 * Hieu ung go chu: khong phai de dep, ma de nguoi choi kip nhan ra co cau moi.
 * Hien phut mot thi mat de dang o ban co se khong thay gi.
 */

CC.ChatUI = (function () {
  let bubble = null, logBox = null, chipRow = null, input = null, panel = null;
  let hideTimer = null, typeTimer = null, freshTimer = null;
  const history = [];

  function addToLog(text, from) {
    history.push({ text, from, at: Date.now() });
    if (!logBox) return;
    const row = CC.util.el('div', { class: 'chat-line chat-' + from }, [
      CC.util.el('span', { class: 'chat-who', text: from === 'cat' ? CC.cfg.CAT_NAME : 'Anh' }),
      CC.util.el('span', { class: 'chat-text', text })
    ]);
    logBox.appendChild(row);
    logBox.scrollTop = logBox.scrollHeight;

    /* Cong tac cho khung thoai o MAY MAN HINH THAP: o do lich su khong chiem cho co
     * dinh nua ma truot de len mep duoi ban co, hien vai giay roi thu lai — de ban
     * co giu duoc chieu cao (xem khoi @media (max-height: 700px) trong style.css).
     * May man hinh cao khong dung toi class nay: CSS chi khai trong media query do,
     * nen o day cu gan vo tu, khong can hoi kich thuoc man hinh. */
    logBox.classList.add('fresh');
    clearTimeout(freshTimer);
    freshTimer = setTimeout(() => logBox.classList.remove('fresh'), CC.cfg.BUBBLE_HIDE);
  }

  /* Go tung chu — toc do vua du de kip nhan ra, khong lam nguoi ta cho */
  function typeInto(node, text) {
    clearInterval(typeTimer);
    node.textContent = '';
    let i = 0;
    const step = Math.max(1, Math.round(text.length / 40));
    typeTimer = setInterval(() => {
      i += step;
      node.textContent = text.slice(0, i);
      if (i >= text.length) { clearInterval(typeTimer); node.textContent = text; }
    }, 18);
  }

  function showBubble(text) {
    if (!bubble) return;
    const body = bubble.querySelector('.bubble-text');
    bubble.classList.add('show');
    typeInto(body, text);

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => bubble.classList.remove('show'), CC.cfg.BUBBLE_HIDE);
  }

  function renderChips() {
    if (!chipRow) return;
    chipRow.textContent = '';
    CC.ChatInput.chips().forEach(c => {
      chipRow.appendChild(CC.util.el('button', {
        class: 'chip', type: 'button', text: c.label,
        // pressChip (khong phai handle) — de loi nguoi choi duoc ghi vao lich su
        onclick: () => CC.ChatInput.pressChip(c)
      }));
    });
  }

  return {
    /* bubbleHost: cho dat bong bong (canh meo)
     * panelHost:  cho dat lich su + o nhap
     */
    mount(bubbleHost, panelHost) {
      bubble = CC.util.el('div', { class: 'bubble' }, [
        CC.util.el('div', { class: 'bubble-text' })
      ]);
      bubbleHost.appendChild(bubble);

      logBox = CC.util.el('div', { class: 'chat-log', 'aria-live': 'polite' });
      chipRow = CC.util.el('div', { class: 'chip-row' });

      input = CC.util.el('input', {
        class: 'chat-input', type: 'text',
        placeholder: 'Nhắn cho ' + CC.cfg.CAT_NAME + '…',
        maxlength: 80, 'aria-label': 'Nhắn cho mèo'
      });
      /* LOI DA SUA: placeholder dung mot lan luc dung giao dien nen giu ten con meo
       * CU sau khi doi doi thu — man hinh ghi "Nhan cho Muc" trong khi dang danh voi
       * Tam The. Moi muc la mot nhan vat khac nen cho nao co ten deu phai ve lai. */
      CC.util.bus.on('game:start', () => {
        input.placeholder = 'Nhắn cho ' + CC.cfg.CAT_NAME + '…';
      });

      const send = CC.util.el('button', {
        class: 'chat-send', type: 'button', text: 'Gửi',
        onclick: () => { CC.ChatInput.submitText(input.value); input.value = ''; }
      });

      input.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        CC.ChatInput.submitText(input.value);
        input.value = '';
      });

      panel = CC.util.el('div', { class: 'chat-panel' }, [
        logBox, chipRow,
        CC.util.el('div', { class: 'chat-input-row' }, [input, send])
      ]);
      panelHost.appendChild(panel);

      renderChips();
      return this;
    },

    init() {
      CC.util.bus.on('chat:say', ({ text, from }) => {
        addToLog(text, from);
        if (from === 'cat') showBubble(text);
      });

      // Nut bam doi theo tinh huong, nen ve lai o moi moc thay doi
      ['game:move', 'game:start', 'game:over', 'game:thinking', 'game:undo']
        .forEach(e => CC.util.bus.on(e, renderChips));

      CC.util.bus.on('prefs:changed', ({ key, val }) => {
        if (key !== 'chatOn') return;
        if (panel) panel.classList.toggle('off', !val);
        if (!val && bubble) bubble.classList.remove('show');
      });

      CC.util.bus.on('game:start', () => {
        if (logBox) logBox.textContent = '';
        history.length = 0;
      });

      const on = CC.Store.prefs().chatOn;
      if (panel) panel.classList.toggle('off', !on);
      return this;
    },

    history: () => history.slice(),

    hide() {
      if (bubble) bubble.classList.remove('show');
    }
  };
})();

;
/* ===== js/ui-screens.js ===== */
/* ui-screens.js — quan ly chuyen man hinh
 *
 * Ba man: menu (chon che do + muc), game (ban co), profile (thanh tich).
 * Chi mot man hien mot luc. Dung thuoc tinh `hidden` chu khong xoa DOM — giu
 * duoc trang thai va tranh dung lai giao dien moi lan chuyen qua chuyen lai.
 */

CC.Screens = (function () {
  const screens = {};
  let current = null;

  const api = {
    register(name, el) {
      screens[name] = el;
      el.hidden = true;
      return api;
    },

    show(name) {
      if (!screens[name]) { console.warn('[screens] khong co man:', name); return; }
      Object.keys(screens).forEach(k => { screens[k].hidden = (k !== name); });
      current = name;
      // Chuyen man thi keo len dau — nguoi choi tren dien thoai hay bi ket o giua trang
      window.scrollTo(0, 0);
      CC.util.bus.emit('screen:changed', { name });
      return api;
    },

    current: () => current
  };

  return api;
})();

;
/* ===== js/ui-audio-toggle.js ===== */
/* ui-audio-toggle.js — hai nut am thanh bam mot cham tren thanh tren
 *
 * VI SAO CAN, KHI DA CO TRONG BANG TUY CHON:
 * Bang tuy chon nam sau nut banh rang — hai thao tac moi toi. Nhung luc can tat
 * tieng thi thuong la luc GAP (co nguoi vao phong, dang hop). Hai thao tac la nhieu.
 * Nut o thanh tren luon nhin thay, bam mot cai la xong.
 *
 * MOT NGUON SU THAT: ca nut nay lan o danh dau trong bang tuy chon deu doc/ghi
 * `CC.Store.prefs()`. Doi o dau thi ben kia tu cap nhat qua su kien `prefs:changed`.
 * Khong ben nao giu trang thai rieng — do la cach duy nhat de hai cho khong lech nhau.
 */

CC.AudioToggle = (function () {
  const BUTTONS = [
    { key: 'sound', on: '🔊', off: '🔇', label: 'Tiếng động' },
    { key: 'bgm',   on: '🎵', off: '🎵', label: 'Nhạc nền' }
  ];

  const els = {};

  function paint() {
    const prefs = CC.Store.prefs();
    BUTTONS.forEach(b => {
      const el = els[b.key];
      if (!el) return;
      const isOn = !!prefs[b.key];
      el.textContent = isOn ? b.on : b.off;
      el.classList.toggle('off', !isOn);
      el.setAttribute('aria-pressed', isOn ? 'true' : 'false');
      el.setAttribute('aria-label', b.label + (isOn ? ' — đang bật' : ' — đang tắt'));
      el.title = b.label + (isOn ? ': bật' : ': tắt');
    });
  }

  return {
    /* Chen hai nut vao truoc nut banh rang */
    mount(topbar, beforeEl) {
      BUTTONS.forEach(b => {
        const el = CC.util.el('button', {
          class: 'icon-btn icon-btn-sm audio-btn',
          type: 'button',
          'data-key': b.key,
          onclick: () => {
            const next = !CC.Store.prefs()[b.key];
            CC.Store.setPref(b.key, next);
            // Bat tieng lan dau can mo khoa AudioContext — cai bam nay chinh la
            // tuong tac nguoi dung ma trinh duyet doi hoi
            if (next) CC.Audio.unlock();
          }
        });
        els[b.key] = el;
        topbar.insertBefore(el, beforeEl);
      });

      paint();
      return this;
    },

    init() {
      // Ai doi tuy chon (nut nay, o danh dau, hay ma khac) thi ve lai theo trang thai moi
      CC.util.bus.on('prefs:changed', ({ key }) => {
        if (key === 'sound' || key === 'bgm') paint();
      });
      return this;
    },

    refresh: paint
  };
})();

;
/* ===== js/ui-elo-picker.js ===== */
/* ui-elo-picker.js — man chon muc suc manh cua Leo
 *
 * Hien TEN MUC kem Elo tham khao, khong quang cao con so nhu the no chinh xac.
 * Ly do thanh that: dai 400-1150 la tu hieu chinh, khong co thang chuan nao de
 * doi chieu. Ghi "khoảng 400" thay vi "400" la dung voi su that.
 *
 * Moi muc hien luon thang/thua da co — nguoi choi thay minh dang mac o dau.
 */

CC.EloPicker = (function () {
  let host = null;
  let selected = null;

  /* Day sao — chi bao NHANH vi tri trong thang, khong phai quy doi tu Elo.
   *
   * Cong thuc cu: Math.round((elo - 400) / (1600 - 400) * 4) + 1. Hai cai sai:
   *   - CHEP CUNG hai dau 400/1600. Them mot muc hay doi nhan Elo deu phai nho
   *     sua tay o day, ma khong co gi nhac. Dung kieu bay da dinh o Sky Chicken:
   *     sua tran nang cap ma quen mot cho tieu thu.
   *   - Elo phan bo KHONG DEU (1250 va 1400 sat nhau) nen lam tron ve so nguyen
   *     cho ra trung nhau — hai muc khac han lai cung 4 sao.
   *
   * Gio chia theo THU HANG trong thang va lam tron toi NUA sao: tam muc ra tam
   * gia tri khac nhau, va them/bot muc khong phai dong vao cong thuc nua.
   */
  function starRow(rank, span) {
    const val = Math.round((1 + rank / span * 4) * 2) / 2;   // 1 .. 5, buoc 0.5
    const row = CC.util.el('div', { class: 'elo-stars', 'aria-label': val + ' tren 5 sao' });
    for (let i = 1; i <= 5; i++) {
      /* Moi o la mot sao RONG, phu len tren mot sao DAC bi cat bot be ngang.
       * Nho vay nua sao khong can ky tu la nao — font nao cung ve dung. */
      const w = Math.max(0, Math.min(1, val - i + 1)) * 100;
      row.appendChild(CC.util.el('span', { class: 'st' },
        w > 0 ? CC.util.el('i', { style: 'width:' + w + '%' }) : null));
    }
    return row;
  }

  function levelCard(lv, rank) {
    const cat = CC.CatProfiles.byElo(lv.elo);
    const rec = CC.Store.record()[String(lv.elo)] || { w: 0, l: 0, d: 0 };
    const played = rec.w + rec.l + rec.d;

    const stats = played
      ? rec.w + ' thắng · ' + rec.l + ' thua' + (rec.d ? ' · ' + rec.d + ' hoà' : '')
      : 'Chưa chơi';

    /* Anh dai dien la KHUON MAT that cua con meo do, khong phai bieu tuong chung.
     * Nguoi choi nhan ra doi thu ngay tu man chon, truoc khi vao van. */
    const avatar = CC.util.el('div', { class: 'elo-avatar' });
    avatar.appendChild(CC.CatBody.face(cat, 54));

    const info = CC.util.el('div', { class: 'elo-info' }, [
      CC.util.el('div', { class: 'elo-name', text: cat.name }),
      CC.util.el('div', { class: 'elo-tag', text: cat.tag }),
      CC.util.el('div', { class: 'elo-num', text: 'khoảng ' + lv.elo + ' Elo' }),
      starRow(rank, CC.EloProfiles.LEVELS.length - 1),
      CC.util.el('div', { class: 'elo-stats' + (rec.w ? ' has-win' : ''), text: stats })
    ]);

    return CC.util.el('button', {
      class: 'elo-card' + (lv.elo === selected ? ' sel' : ''),
      type: 'button',
      'data-elo': lv.elo,
      title: cat.about,
      'aria-pressed': lv.elo === selected ? 'true' : 'false',
      onclick: () => api.select(lv.elo)
    }, [avatar, info]);
  }

  const api = {
    mount(container) {
      host = CC.util.el('div', { class: 'elo-grid' });
      container.appendChild(host);
      selected = CC.Store.prefs().elo;
      api.render();
      return api;
    },

    render() {
      if (!host) return;
      host.textContent = '';
      CC.EloProfiles.LEVELS.forEach((lv, i) => host.appendChild(levelCard(lv, i)));
    },

    select(elo) {
      selected = elo;
      CC.Store.setPref('elo', elo);
      api.render();
      CC.util.bus.emit('elo:selected', { elo });
      return api;
    },

    value: () => selected
  };

  return api;
})();

;
/* ===== js/ui-menu.js ===== */
/* ui-menu.js — man hinh dau: chon che do va muc suc manh
 *
 * Thu tu tren man hinh co chu y:
 *   1. "Choi tiep" (neu co van dang do) — thu nguoi choi can nhat khi quay lai
 *   2. Chon doi thu (moi muc la mot con meo rieng, xem data-cat-profiles.js)
 *   3. Dau voi con meo dang chon  (nut chinh)
 *   4. Hai nguoi chung may (nut phu)
 *   5. Thanh tich
 *
 * Khong bat dang nhap, khong hoi gi truoc khi choi. Vao la danh duoc.
 */

CC.Menu = (function () {
  let host = null, resumeBox = null;

  function summaryLine() {
    const s = CC.Scoring.summary();
    if (!s.totalGames) return 'Chưa có ván nào — bắt đầu thôi ạ!';
    const parts = [s.wins + ' thắng', s.losses + ' thua'];
    if (s.draws) parts.push(s.draws + ' hoà');
    if (s.bestEloBeaten) parts.push('cao nhất đã thắng: ' + s.bestEloBeaten);
    return parts.join(' · ');
  }

  /* O "choi tiep" chi hien khi that su co van dang do */
  function renderResume() {
    resumeBox.textContent = '';
    const saved = CC.Store.loadGame();
    if (!saved || !saved.moves || !saved.moves.length) { resumeBox.hidden = true; return; }

    resumeBox.hidden = false;
    const cat = CC.CatProfiles.byElo(saved.elo);
    const desc = saved.mode === 'hotseat'
      ? 'Hai người · ' + saved.moves.length + ' nước'
      : cat.name + ' · ' + saved.moves.length + ' nước';

    resumeBox.appendChild(CC.util.el('button', {
      class: 'btn btn-primary btn-resume', type: 'button',
      onclick: () => CC.util.bus.emit('ui:resume', {})
    }, [
      CC.util.el('span', { class: 'resume-title', text: 'Chơi tiếp ván đang dở' }),
      CC.util.el('span', { class: 'resume-desc', text: desc })
    ]));

    resumeBox.appendChild(CC.util.el('button', {
      class: 'btn btn-ghost btn-sm', type: 'button', text: 'Bỏ ván này',
      onclick: () => { CC.Store.clearGame(); renderResume(); }
    }));
  }

  return {
    mount(container) {
      host = container;

      resumeBox = CC.util.el('div', { class: 'resume-box' });
      host.appendChild(resumeBox);

      host.appendChild(CC.util.el('h2', { class: 'sec-title', text: 'Chọn đối thủ' }));
      CC.EloPicker.mount(host);

      /* Nut doi chu theo con meo dang chon — nguoi choi biet minh sap dau voi ai */
      const playBtn = CC.util.el('button', {
        class: 'btn btn-primary btn-big', type: 'button',
        text: 'Đấu với ' + CC.CatProfiles.byElo(CC.EloPicker.value()).name,
        onclick: () => CC.util.bus.emit('ui:start', { mode: 'ai', elo: CC.EloPicker.value() })
      });
      host.appendChild(playBtn);
      CC.util.bus.on('elo:selected', ({ elo }) => {
        playBtn.textContent = 'Đấu với ' + CC.CatProfiles.byElo(elo).name;
      });

      host.appendChild(CC.util.el('button', {
        class: 'btn btn-big', type: 'button',
        text: 'Hai người chung máy',
        onclick: () => CC.util.bus.emit('ui:start', { mode: 'hotseat' })
      }));

      host.appendChild(CC.util.el('button', {
        class: 'btn btn-big btn-ghost', type: 'button',
        text: 'Thành tích & bảng xếp hạng',
        onclick: () => CC.util.bus.emit('ui:rank', {})
      }));

      host.appendChild(CC.util.el('div', { class: 'menu-summary', id: 'menu-summary', text: summaryLine() }));

      /* Chon mau quan — de cuoi vi it nguoi doi */
      const colorRow = CC.util.el('div', { class: 'color-row' }, [
        CC.util.el('span', { class: 'color-label', text: 'Anh cầm quân:' })
      ]);
      ['w', 'b'].forEach(c => {
        colorRow.appendChild(CC.util.el('button', {
          class: 'btn btn-sm color-btn', type: 'button',
          'data-color': c,
          text: c === 'w' ? 'Trắng (đi trước)' : 'Đen',
          onclick: () => {
            CC.Store.setPref('playerColor', c);
            CC.util.$$('.color-btn', host).forEach(b => b.classList.toggle('sel', b.dataset.color === c));
          }
        }));
      });
      host.appendChild(colorRow);

      const cur = CC.Store.prefs().playerColor || 'w';
      CC.util.$$('.color-btn', host).forEach(b => b.classList.toggle('sel', b.dataset.color === cur));

      return this;
    },

    refresh() {
      renderResume();
      CC.EloPicker.render();
      const el = CC.util.$('#menu-summary');
      if (el) el.textContent = summaryLine();
    }
  };
})();

;
/* ===== js/ui-game-hud.js ===== */
/* ui-game-hud.js — thanh trang thai, quan bi an, nut dieu khien
 *
 * Ba thu nguoi choi can biet moi luc, khong phai tim:
 *   1. Den luot ai       — dong chu to nhat
 *   2. Ai dang hon quan  — hang quan bi an + chenh lech
 *   3. Lam gi tiep       — nut Di lai / Lat ban / Van moi
 */

CC.HUD = (function () {
  let statusEl = null, capTop = null, capBot = null, engineEl = null;

  /* Ve hang quan bi an bang SVG nho — nhin ra ngay ai hon gi */
  function renderCaptured(box, types, diff) {
    box.textContent = '';
    // Gom theo loai roi sap tu quan to den quan nho
    const order = ['q', 'r', 'b', 'n', 'p'];
    types.slice().sort((a, b) => order.indexOf(a) - order.indexOf(b)).forEach(t => {
      const s = CC.util.svg('svg', { viewBox: '0 0 100 100', class: 'cap-piece' });
      s.appendChild(CC.Pieces.build(t, box.dataset.color));
      box.appendChild(s);
    });
    if (diff > 0) {
      box.appendChild(CC.util.el('span', { class: 'cap-diff', text: '+' + diff }));
    }
  }

  function updateCaptured() {
    const cap = CC.Rules.captured();
    const diff = CC.Rules.materialDiff();   // duong = Trang dang hon

    const meBottom = CC.Board.isFlipped() ? 'b' : 'w';
    const meTop = meBottom === 'w' ? 'b' : 'w';

    // capBot hien quan cua doi thu ma BEN DUOI da an duoc
    capBot.dataset.color = meTop;
    capTop.dataset.color = meBottom;

    const diffBottom = meBottom === 'w' ? diff : -diff;
    renderCaptured(capBot, cap[meTop], diffBottom > 0 ? diffBottom : 0);
    renderCaptured(capTop, cap[meBottom], diffBottom < 0 ? -diffBottom : 0);
  }

  function updateStatus() {
    const st = CC.Game.state;
    if (st.over) return;

    let text;
    if (st.mode === 'hotseat') {
      text = (CC.Rules.turn() === 'w' ? 'Lượt Trắng' : 'Lượt Đen');
    } else if (st.thinking) {
      text = CC.cfg.CAT_NAME + ' đang nghĩ…';
    } else if (CC.Game.isPlayerTurn()) {
      text = 'Đến lượt Anh';
    } else {
      text = CC.cfg.CAT_NAME + ' sắp đi…';
    }
    if (CC.Rules.inCheck()) text += ' · CHIẾU!';

    statusEl.textContent = text;
    statusEl.classList.toggle('check', CC.Rules.inCheck());
  }

  /* Trang thai nap engine — bao ro thay vi de nguoi choi ngoi doan */
  function updateEngine(state, err) {
    if (!engineEl) return;
    engineEl.textContent = '';
    engineEl.hidden = (state === 'ready' || CC.Game.state.mode === 'hotseat');

    if (state === 'loading') {
      engineEl.appendChild(CC.util.el('span', { text: CC.cfg.CAT_NAME + ' đang ngủ dậy…' }));
    } else if (state === 'failed') {
      engineEl.appendChild(CC.util.el('span', {
        class: 'err', text: 'Không đánh thức được ' + CC.cfg.CAT_NAME + ' (' + (err ? err.message : 'lỗi') + ')'
      }));
      engineEl.appendChild(CC.util.el('button', {
        class: 'btn btn-sm', type: 'button', text: 'Thử lại',
        onclick: () => CC.Engine.retry()
      }));
    }
  }

  return {
    mount(refs) {
      statusEl = refs.status;
      capTop = refs.capTop;
      capBot = refs.capBot;
      engineEl = refs.engine;
      return this;
    },

    init() {
      const B = CC.util.bus;
      const refreshAll = () => { updateStatus(); updateCaptured(); };

      ['game:move', 'game:start', 'game:undo', 'game:restored', 'board:flipped']
        .forEach(e => B.on(e, refreshAll));

      B.on('game:thinking', updateStatus);
      B.on('game:turn', updateStatus);

      B.on('engine:loading', () => updateEngine('loading'));
      B.on('engine:ready', () => updateEngine('ready'));
      B.on('engine:failed', ({ error }) => updateEngine('failed', error));

      B.on('game:over', ({ result, outcome, mode }) => {
        let t;
        if (mode === 'hotseat') {
          t = result.winner ? ((result.winner === 'w' ? 'Trắng' : 'Đen') + ' thắng!') : 'Hoà!';
        } else {
          t = outcome === 'win' ? 'Anh thắng!' : outcome === 'loss' ? CC.cfg.CAT_NAME + ' thắng!' : 'Hoà!';
        }
        statusEl.textContent = t + ' · ' + result.label;
        statusEl.classList.remove('check');
      });

      updateEngine(CC.Engine.bootState(), CC.Engine.bootError());
      return this;
    },

    refresh() { updateStatus(); updateCaptured(); }
  };
})();

;
/* ===== js/ui-move-list.js ===== */
/* ui-move-list.js — bang nuoc di
 *
 * Hai muc dich:
 *   1. Nguoi choi doc lai duoc dien bien van co (thu co vua nao cung can)
 *   2. Lap cho trong duoi con meo o khung may tinh — truoc do la mot mang den rong
 *
 * Tren dien thoai thi AN di: man hinh doc khong du cho, va nguoi choi cam may
 * hiem khi doc lai lich su. Ai can thi lat may ngang.
 */

CC.MoveList = (function () {
  let host = null, body = null;

  /* Gom nuoc di thanh tung cap Trang/Den — dung cach doc quen thuoc cua co vua */
  function rows() {
    const h = CC.Rules.historyVerbose();
    const out = [];
    for (let i = 0; i < h.length; i += 2) {
      out.push({
        no: i / 2 + 1,
        w: h[i] ? h[i].san : '',
        b: h[i + 1] ? h[i + 1].san : ''
      });
    }
    return out;
  }

  function render() {
    if (!body) return;
    const list = rows();
    body.textContent = '';

    if (!list.length) {
      body.appendChild(CC.util.el('div', { class: 'ml-empty', text: 'Chưa có nước nào' }));
      return;
    }

    /* Nuoc dang duoc XEM (khi lat lai lich su) chu khong phai nuoc cuoi cung —
     * neu khong thi luc xem lai, van danh dau sai cho. */
    const cur = CC.MoveNav && CC.MoveNav.isReviewing()
      ? CC.MoveNav.viewedPly()
      : CC.Rules.historyVerbose().length;

    list.forEach(r => {
      /* Moi o la mot nut nhay toi nuoc do — nhanh hon bam mui ten hang chuc lan
       * khi muon coi lai mot nuoc o giua van */
      const cell = (san, ply) => CC.util.el(san ? 'button' : 'span', {
        class: 'ml-san' + (cur === ply ? ' now' : ''),
        type: san ? 'button' : undefined,
        text: san || '',
        onclick: san ? () => CC.MoveNav.goTo(ply) : undefined
      });

      body.appendChild(CC.util.el('div', { class: 'ml-row' }, [
        CC.util.el('span', { class: 'ml-no', text: r.no + '.' }),
        cell(r.w, r.no * 2 - 1),
        cell(r.b, r.no * 2)
      ]));
    });

    // Luon cuon xuong nuoc moi nhat
    body.scrollTop = body.scrollHeight;
  }

  return {
    mount(container) {
      host = CC.util.el('div', { class: 'move-list' }, [
        CC.util.el('div', { class: 'ml-title', text: 'Nước đi' })
      ]);
      body = CC.util.el('div', { class: 'ml-body' });
      host.appendChild(body);
      container.appendChild(host);
      render();
      return this;
    },

    init() {
      ['game:move', 'game:start', 'game:undo', 'game:restored', 'replay:changed']
        .forEach(e => CC.util.bus.on(e, render));
      return this;
    },

    render
  };
})();

;
/* ===== js/ui-move-nav.js ===== */
/* ui-move-nav.js — xem lai cac nuoc da di
 *
 * Hai mui ten lat qua lai lich su van co. Nguoi choi hay lo mat nuoc doi thu vua
 * di, hoac muon coi lai minh hong o dau — khong co cai nay thi phai nho trong dau.
 *
 * NGUYEN TAC: xem lai KHONG DUOC dung vao van dang choi.
 * Ban co ve tu mot the co CHUP LAI (CC.Rules.snapshotAt), con `CC.Rules` giu nguyen
 * van that. Nho vay khong the lo tay lam hong ván khi dang coi lai.
 *
 * Trong luc xem lai thi KHOA tuong tac — khong cho di quan o the co cu, vi nuoc do
 * se ap vao van hien tai chu khong phai the co dang xem. Rat de gay hieu nham.
 */

CC.MoveNav = (function () {
  let bar = null, btnBack = null, btnFwd = null, btnLive = null, label = null;
  let viewPly = null;      // null = dang xem van that; so = dang xem lai

  function total() {
    return CC.Rules.historyUci().length;
  }

  function isReviewing() {
    return viewPly !== null;
  }

  /* Ve ban co theo the co tai `ply` */
  function show(ply) {
    const moves = CC.Rules.historyUci();
    const n = CC.util.clamp(ply, 0, moves.length);

    if (n >= moves.length) { api.live(); return; }

    viewPly = n;
    const snap = CC.Rules.snapshotAt(moves, n);

    CC.Board.clearPieces();
    CC.Board.sync({ pieces: snap.pieces });
    CC.Highlight.setLastMove(snap.last);
    CC.Highlight.setCheck(snap.checkSquare);
    CC.Highlight.clearMoves();

    CC.Interaction.setEnabled(false);
    paint();
    CC.util.bus.emit('replay:changed', { ply: n, total: moves.length, reviewing: true });
  }

  function paint() {
    if (!bar) return;
    const n = total();

    bar.classList.toggle('reviewing', isReviewing());
    /* Vien vang quanh ban co khi dang xem lai — dau hieu manh nhat de nguoi choi
     * khong nham the co cu voi van dang choi. Chi doi mo mau thi de bo qua. */
    document.body.classList.toggle('reviewing', isReviewing());
    btnBack.disabled = isReviewing() ? viewPly <= 0 : n === 0;
    btnFwd.disabled = !isReviewing();
    btnLive.hidden = !isReviewing();

    label.textContent = isReviewing()
      ? 'Đang xem nước ' + viewPly + '/' + n
      : '';
  }

  const api = {
    isReviewing,
    /* Dang xem nuoc thu may — bang nuoc di dung de danh dau dong tuong ung */
    viewedPly: () => viewPly,

    back() {
      const n = total();
      if (!n) return;
      show(isReviewing() ? viewPly - 1 : n - 1);
    },

    forward() {
      if (!isReviewing()) return;
      show(viewPly + 1);
    },

    /* Nhay toi mot nuoc cu the — bang nuoc di goi vao day khi nguoi choi bam mot dong */
    goTo(ply) { show(ply); },

    /* Ve lai van that */
    live() {
      if (!isReviewing()) { paint(); return; }
      viewPly = null;

      CC.Board.clearPieces();
      CC.Board.sync();

      const hist = CC.Rules.historyVerbose();
      CC.Highlight.setLastMove(hist.length ? hist[hist.length - 1] : null);
      CC.Highlight.setCheck(CC.Rules.inCheck() ? CC.Rules.kingSquare(CC.Rules.turn()) : null);

      // Mo lai tuong tac dung theo trang thai van (dang toi luot meo thi van khoa)
      CC.Interaction.setEnabled(!CC.Game.state.over && CC.Game.isPlayerTurn() && !CC.Game.state.busy);

      paint();
      CC.util.bus.emit('replay:changed', { ply: total(), total: total(), reviewing: false });
    },

    mount(container) {
      btnBack = CC.util.el('button', {
        class: 'nav-btn', type: 'button', 'aria-label': 'Nước trước', text: '‹',
        onclick: () => api.back()
      });
      btnFwd = CC.util.el('button', {
        class: 'nav-btn', type: 'button', 'aria-label': 'Nước sau', text: '›',
        onclick: () => api.forward()
      });
      btnLive = CC.util.el('button', {
        class: 'btn btn-sm nav-live', type: 'button', text: 'Về ván đang chơi',
        hidden: true,
        onclick: () => api.live()
      });
      label = CC.util.el('span', { class: 'nav-label' });

      bar = CC.util.el('div', { class: 'move-nav' }, [btnBack, label, btnFwd, btnLive]);
      container.appendChild(bar);
      paint();
      return api;
    },

    init() {
      const B = CC.util.bus;

      /* Co nuoc moi thi tu ve van that — nguoi choi dang coi lai ma doi thu di
       * xong, phai thay ngay chu khong ket o the co cu */
      ['game:move', 'game:start', 'game:undo', 'game:restored'].forEach(e => {
        B.on(e, () => { if (isReviewing()) api.live(); else paint(); });
      });

      /* Phim mui ten — nhanh hon bam nut nhieu khi lat qua lai nhieu nuoc */
      document.addEventListener('keydown', ev => {
        if (CC.Screens.current() !== 'game') return;
        // Dang go chu trong o chat thi mui ten la de di chuyen con tro
        if (ev.target && /^(INPUT|TEXTAREA)$/.test(ev.target.tagName)) return;

        if (ev.key === 'ArrowLeft') { api.back(); ev.preventDefault(); }
        else if (ev.key === 'ArrowRight') { api.forward(); ev.preventDefault(); }
        else if (ev.key === 'Escape' && isReviewing()) { api.live(); ev.preventDefault(); }
      });

      return api;
    }
  };

  return api;
})();

;
/* ===== js/ui-rank-panel.js ===== */
/* ui-rank-panel.js — bang xep hang 3 tab + ho so ca nhan
 *
 * TIEU CHI XEP HANG NGHI LAI CHO CO VUA (Sky Chicken xep theo "man cao nhat",
 * co vua khong co man):
 *   MUC CAO NHAT   bestEloBeaten — thuoc do tu nhien, ai cung co so ngay van dau
 *   DIEM MEO       catPoints     — thang muc nao cong diem muc do, hoa duoc nua
 *                                  -> thuong ca nguoi choi BEN, khong chi nguoi GIOI
 *   CHUOI THANG    bestStreak    — vui, de khoe, tao ly do choi tiep
 *
 * Dem 60 giay de do ton luot doc cua goi mien phi.
 * CHUA DANG NHAP van xem duoc bang — chi la khong co ten minh tren do.
 */

CC.RankPanel = (function () {
  const CACHE_MS = 60000;
  const TABS = [
    { key: 'bestEloBeaten', label: 'Mức cao nhất', fmt: v => v ? 'khoảng ' + v + ' Elo' : '—' },
    { key: 'catPoints', label: 'Điểm mèo', fmt: v => (v || 0).toLocaleString('vi-VN') },
    { key: 'bestStreak', label: 'Chuỗi thắng', fmt: v => (v || 0) + ' ván' }
  ];

  let host = null, listBox = null, tab = TABS[0].key;
  const cache = {};   // key -> {at, rows}

  function myRow(rows) {
    const me = Portal.Auth.user;
    if (!me) return null;
    return rows.find(r => r.uid === me.uid) || null;
  }

  function renderRows(rows, key) {
    const t = TABS.find(x => x.key === key);
    listBox.textContent = '';

    if (!rows.length) {
      listBox.appendChild(CC.util.el('p', {
        class: 'rank-empty',
        text: 'Chưa có ai trên bảng. Anh thắng một ván là có tên ngay!'
      }));
      return;
    }

    const meUid = Portal.Auth.user ? Portal.Auth.user.uid : null;
    rows.slice(0, 100).forEach(r => {
      listBox.appendChild(CC.util.el('div', {
        class: 'rank-row' + (r.uid === meUid ? ' me' : '')
      }, [
        /* `pos`, KHONG phai `rank`. Ban truy van cu (CC.Cloud.top) dat ten truong la
         * `rank`; mã dùng chung `Portal.Rank.top()` dat la `pos` — giong Sky Chicken.
         * Doi mã chung ma quen sua cho nay, nen bang hien "#undefined" de len ten. */
        CC.util.el('span', { class: 'rank-no', text: '#' + r.pos }),
        CC.util.el('span', { class: 'rank-name', text: r.name || 'Kỳ thủ' }),
        CC.util.el('span', { class: 'rank-val', text: t.fmt(r[key]) })
      ]));
    });
  }

  async function loadTab(key) {
    tab = key;
    CC.util.$$('.rank-tab', host).forEach(b => b.classList.toggle('sel', b.dataset.key === key));

    const c = cache[key];
    if (c && Date.now() - c.at < CACHE_MS) { renderRows(c.rows, key); return; }

    listBox.textContent = '';
    listBox.appendChild(CC.util.el('p', { class: 'rank-empty', text: 'Đang tải…' }));

    try {
      const rows = await Portal.Rank.top('chessScores', key, { limit: 100 });
      cache[key] = { at: Date.now(), rows };
      renderRows(rows, key);
    } catch (e) {
      listBox.textContent = '';
      listBox.appendChild(CC.util.el('p', {
        class: 'rank-empty err',
        text: 'Không tải được bảng xếp hạng: ' + Portal.FB.err(e)
      }));
    }
  }

  /* Thanh tich cua chinh minh — luon hien duoc, khong can dang nhap */
  function renderMine(box) {
    const s = CC.Scoring.summary();
    box.textContent = '';
    box.appendChild(CC.util.el('h3', { class: 'sec-title', text: 'Thành tích của Anh' }));

    const grid = CC.util.el('div', { class: 'stat-grid' });
    [
      ['Mức cao nhất đã thắng', s.bestEloBeaten ? 'khoảng ' + s.bestEloBeaten : 'chưa có'],
      ['Điểm mèo', (s.catPoints || 0).toLocaleString('vi-VN')],
      ['Chuỗi thắng dài nhất', s.bestStreak + ' ván'],
      ['Tổng số ván', s.totalGames + ' ván'],
      ['Thắng / Thua / Hoà', s.wins + ' / ' + s.losses + ' / ' + s.draws]
    ].forEach(([k, v]) => {
      grid.appendChild(CC.util.el('div', { class: 'stat-cell' }, [
        CC.util.el('span', { class: 'stat-k', text: k }),
        CC.util.el('span', { class: 'stat-v', text: String(v) })
      ]));
    });
    box.appendChild(grid);

    box.appendChild(CC.util.el('p', {
      class: 'rank-note',
      text: 'Ván 2 người chung máy không tính vào thành tích.'
    }));
  }

  return {
    mount(container) {
      host = container;

      const mine = CC.util.el('div', { class: 'rank-mine' });
      host.appendChild(mine);
      renderMine(mine);

      /* Khu dang nhap — tu an han neu chua khai bao Firebase */
      const authBox = CC.util.el('div', { class: 'auth-box' });
      host.appendChild(authBox);

      if (!Portal.Auth.available()) {
        authBox.appendChild(CC.util.el('p', {
          class: 'rank-note',
          text: 'Bảng xếp hạng chưa bật. Thành tích vẫn được lưu trong máy.'
        }));
        return this;
      }

      Portal.Auth.onChange(u => {
        authBox.textContent = '';
        if (u) {
          authBox.appendChild(CC.util.el('span', { class: 'auth-name', text: 'Xin chào, ' + u.name }));
          authBox.appendChild(CC.util.el('button', {
            class: 'btn btn-sm', type: 'button', text: 'Đăng xuất',
            onclick: () => Portal.Auth.logout()
          }));
        } else {
          authBox.appendChild(CC.util.el('p', {
            class: 'rank-note', text: 'Đăng nhập để ghi tên lên bảng xếp hạng.'
          }));
          authBox.appendChild(CC.util.el('button', {
            class: 'btn btn-primary', type: 'button',
            text: Portal.Auth.busy ? 'Đang xử lý…' : 'Đăng nhập Google',
            disabled: Portal.Auth.busy || undefined,
            onclick: () => Portal.Auth.login()
          }));
        }
      });

      /* Đường sang trang hồ sơ chung — nơi xem thành tích cả cổng game.
         Tự ẩn khi không có portal (chạy ở gốc localhost, mở bằng file://): nút dẫn
         tới trang 404 còn tệ hơn không có nút. */
      const hoSo = Portal.duongDanHoSo && Portal.duongDanHoSo();
      if (hoSo) {
        host.appendChild(CC.util.el('a', {
          class: 'rank-hoso', href: hoSo, text: 'Xem hồ sơ cả cổng game →'
        }));
      }

      const tabRow = CC.util.el('div', { class: 'rank-tabs' });
      TABS.forEach(t => {
        tabRow.appendChild(CC.util.el('button', {
          class: 'rank-tab' + (t.key === tab ? ' sel' : ''),
          type: 'button', 'data-key': t.key, text: t.label,
          onclick: () => loadTab(t.key)
        }));
      });
      host.appendChild(tabRow);

      listBox = CC.util.el('div', { class: 'rank-list' });
      host.appendChild(listBox);

      return this;
    },

    refresh() {
      const mine = CC.util.$('.rank-mine', host);
      if (mine) renderMine(mine);
      if (listBox && Portal.Auth.available()) loadTab(tab);
    },

    myRow
  };
})();

;
/* ===== js/ui-result-dialog.js ===== */
/* ui-result-dialog.js — bang ket qua cuoi van
 *
 * Hien SAU khi meo noi cau ket — de nguoi choi doc duoc phan ung cua Leo truoc,
 * roi moi den bang so. Dao thu tu la mat het cai hay cua nhan vat.
 *
 * Luon co loi ra ro rang: choi lai ngay, doi muc, hoac ve menu.
 */

CC.ResultDialog = (function () {
  const DELAY = 1400;   // cho meo noi xong da
  let box = null;

  function close() {
    if (!box) return;
    box.remove();
    box = null;
  }

  function build(data) {
    const { result, outcome, mode } = data;
    const st = CC.Game.state;

    let title, sub;
    if (mode === 'hotseat') {
      title = result.winner ? ((result.winner === 'w' ? 'Trắng' : 'Đen') + ' thắng!') : 'Hoà!';
      sub = result.label;
    } else {
      const cat = CC.CatProfiles.byElo(st.elo);
      title = outcome === 'win' ? 'Anh thắng rồi!'
            : outcome === 'loss' ? cat.name + ' thắng!' : 'Hoà!';
      sub = result.label + ' · ' + cat.name + ' · ' + cat.tag + ' (khoảng ' + st.elo + ' Elo)';
    }

    const inner = CC.util.el('div', { class: 'result-box result-' + outcome }, [
      CC.util.el('h2', { class: 'result-title', text: title }),
      CC.util.el('p', { class: 'result-sub', text: sub })
    ]);

    /* Thanh tich o muc vua choi — cho nguoi choi thay tien do */
    if (mode === 'ai') {
      const rec = CC.Store.record()[String(st.elo)];
      if (rec) {
        inner.appendChild(CC.util.el('p', {
          class: 'result-rec',
          text: 'Ở mức này: ' + rec.w + ' thắng · ' + rec.l + ' thua'
            + (rec.d ? ' · ' + rec.d + ' hoà' : '')
        }));
      }

      // Thang 3 van roi thi rue len muc cao hon
      const next = CC.EloProfiles.LEVELS.find(l => l.elo > st.elo);
      if (outcome === 'win' && rec && rec.w >= 3 && next) {
        inner.appendChild(CC.util.el('p', {
          class: 'result-tip',
          text: 'Anh thắng mức này nhiều rồi — thử đấu với '
              + CC.CatProfiles.byElo(next.elo).name + ' xem sao?'
        }));
      }
    }

    const row = CC.util.el('div', { class: 'result-actions' });
    row.appendChild(CC.util.el('button', {
      class: 'btn btn-primary', type: 'button', text: 'Chơi lại',
      onclick: () => { close(); CC.util.bus.emit('ui:new-game', {}); }
    }));
    if (mode === 'ai') {
      row.appendChild(CC.util.el('button', {
        class: 'btn', type: 'button', text: 'Đổi mức',
        onclick: () => { close(); CC.Screens.show('menu'); }
      }));
    }
    row.appendChild(CC.util.el('button', {
      class: 'btn btn-ghost', type: 'button', text: 'Xem lại bàn cờ',
      onclick: close
    }));
    inner.appendChild(row);

    return CC.util.el('div', { class: 'result-overlay' }, [inner]);
  }

  return {
    init() {
      CC.util.bus.on('game:over', data => {
        setTimeout(() => {
          close();
          box = build(data);
          document.body.appendChild(box);
          requestAnimationFrame(() => box.classList.add('show'));
        }, DELAY);
      });

      CC.util.bus.on('game:start', close);
      return this;
    },
    close
  };
})();

;
/* ===== js/ui-portal-return.js ===== */
/* ui-portal-return.js — nut quay ve portal
 *
 * TU AN khi khong co portal. Game chay o ba noi khac nhau:
 *   - camandaulung.github.io/game/chess  -> co portal o /game/, hien nut
 *   - mo file rieng le / localhost goc    -> khong co portal, an nut
 *
 * Nut dan toi noi khong co gi con te hon la khong co nut.
 */

CC.PortalReturn = (function () {
  /* Duong dan cha, hoac null neu dang o goc */
  function parentPath() {
    const parts = location.pathname.split('/').filter(Boolean);
    // Bo phan cuoi neu la ten file (co dau cham)
    if (parts.length && parts[parts.length - 1].indexOf('.') >= 0) parts.pop();
    if (parts.length < 1) return null;      // dang o goc, khong co cha
    parts.pop();
    return '/' + (parts.length ? parts.join('/') + '/' : '');
  }

  return {
    init(btn) {
      if (!btn) return this;
      const parent = parentPath();

      if (!parent || location.protocol === 'file:') {
        btn.hidden = true;
        return this;
      }

      btn.hidden = false;
      btn.addEventListener('click', () => { location.href = parent; });
      return this;
    }
  };
})();

;
/* ===== js/ui-update-notice.js ===== */
/* ui-update-notice.js — bao cho nguoi choi biet co ban moi
 *
 * VI SAO CAN: khong co no thi nguoi choi ket o ban cu cho toi khi tu tay tai lai
 * trang. Ho khong co ly do gi de lam vay, nen moi ban sua sau nay coi nhu khong
 * den duoc tay ho. Da tung viet trong tai lieu la "co bao" ma khong he lam.
 *
 * VI SAO KHONG TU TAI LAI NGAY: dang danh do ma trang tu tai lai la MAT VAN.
 * Nen chi hien mot dai bao, cho nguoi choi bam. Ho dang danh thi cu lo di, lan
 * mo sau tu khac nhan ban moi.
 *
 * Di kem thay doi o sw-template.js: da BO `skipWaiting()` o buoc install. Ban moi
 * nam cho san (`waiting`) thay vi tu chiem quyen — co vay moi hoi y kien duoc.
 *
 * O ban dang phat trien khong co service worker, module tu tat: build.mjs chen
 * `window.CC_SW` vao ban dong goi, chay bang dev-server thi bien do khong ton tai.
 */

CC.UpdateNotice = (function () {
  let bar = null;

  function show(waiting) {
    if (bar) return;

    bar = CC.util.el('div', { class: 'update-bar' }, [
      CC.util.el('span', { class: 'update-text', text: 'Có bản mới rồi ạ!' }),
      CC.util.el('button', {
        class: 'btn btn-sm btn-primary', type: 'button', text: 'Tải lại',
        onclick: () => {
          /* Bao ban dang cho hay chiem quyen di. Trang se tu tai lai o
           * `controllerchange` ben duoi — khong tai lai o day, vi lam vay se tai
           * truoc khi ban moi kip nam quyen, va nguoi choi lai nhan ban cu. */
          waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      }),
      CC.util.el('button', {
        class: 'btn btn-sm btn-ghost', type: 'button', text: 'Để sau',
        onclick: () => { bar.remove(); bar = null; }
      })
    ]);

    document.body.appendChild(bar);
    requestAnimationFrame(() => bar.classList.add('show'));
  }

  /* Theo doi mot dang ky: co ban moi luc nao thi hien dai bao luc do */
  function watch(reg) {
    if (!reg) return;

    // Da co ban dang cho san (nguoi choi mo lai trang truoc khi bam Tai lai)
    if (reg.waiting) show(reg.waiting);

    reg.addEventListener('updatefound', () => {
      const sw = reg.installing;
      if (!sw) return;
      sw.addEventListener('statechange', () => {
        // `controller` co nghia la trang dang duoc mot SW phuc vu -> day la BAN MOI,
        // khong phai lan cai dat dau tien. Lan dau thi khong co gi de bao.
        if (sw.state === 'installed' && navigator.serviceWorker.controller) show(sw);
      });
    });
  }

  return {
    init() {
      if (!('serviceWorker' in navigator)) return;
      // Chi ban dong goi moi co service worker — xem ghi chu dau file
      if (!window.CC_SW) return;

      navigator.serviceWorker.register(window.CC_SW)
        .then(watch)
        .catch(e => console.warn('[sw] dang ky that bai:', e.message));

      /* Ban moi vua nam quyen -> tai lai de nguoi choi thay no.
       * Co `reloaded` de khong roi vao vong tai lai vo tan. */
      let reloaded = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (reloaded) return;
        reloaded = true;
        location.reload();
      });

      // Kiem tra ban moi moi khi nguoi choi quay lai tab
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) return;
        navigator.serviceWorker.getRegistration().then(r => { if (r) r.update(); });
      });

      return this;
    }
  };
})();

;
/* ===== js/main.js ===== */
/* main.js — khoi dong game, noi cac he thong lai voi nhau
 *
 * File nay CHI lam viec lap rap. Moi logic nam o module tuong ung.
 * Thu tu khoi tao quan trong: ban co truoc, roi den cac he thong nghe su kien.
 */

(function () {
  const $ = CC.util.$;

  function boot() {
    /* --- ban co --- */
    CC.Rules.newGame();
    CC.Board.mount($('#board-host'));
    CC.Highlight.init();
    CC.Interaction.init({
      canMove: sq => CC.Game.canMove(sq),
      onMove: (from, to) => CC.Game.playerMove(from, to)
    });

    /* --- am thanh + hieu ung --- */
    CC.Audio.init();
    CC.Sfx.init();
    CC.Bgm.init();
    CC.BoardFx.init();

    /* --- meo --- */
    CC.Cat.mount($('#cat-host')).init();
    CC.MoveList.mount($('#cat-host').parentNode).init();

    /* --- chat --- */
    CC.ChatUI.mount($('#bubble-host'), $('#chat-host')).init();
    CC.ChatPicker.init();
    CC.ChatEvents.init();

    /* --- giao dien --- */
    CC.HUD.mount({
      status: $('#status'),
      capTop: $('#cap-top'),
      capBot: $('#cap-bot'),
      engine: $('#engine-state')
    }).init();

    CC.MoveNav.mount($('#nav-host')).init();
    CC.ResultDialog.init();
    CC.Hotseat.init();

    CC.Screens
      .register('menu', $('#scr-menu'))
      .register('game', $('#scr-game'))
      .register('rank', $('#scr-rank'));

    CC.Menu.mount($('#menu-body'));
    CC.PortalReturn.init($('#btn-portal'));

    /* Hai nut am thanh bam mot cham, dat truoc nut banh rang */
    CC.AudioToggle.mount($('.topbar'), $('#btn-settings')).init();

    /* Bao "co ban moi" — chi hoat dong o ban dong goi (co service worker) */
    CC.UpdateNotice.init();

    /* --- dam may: tu an han neu chua khai bao Firebase ---
     * Adapter noi truoc, roi moi khoi dong dang nhap: Portal.Auth se goi
     * Portal.Cloud.onUser() ngay khi biet phien, luc do adapter phai co san. */
    CC.CloudAdapter.init();
    Portal.Auth.init();
    CC.RankPanel.mount($('#rank-body'));

    wireButtons();
    wireFlow();

    /* Engine tai o NEN — trang dung duoc ngay, khong cho */
    CC.Engine.warmUp();

    CC.Menu.refresh();
    CC.Screens.show('menu');
  }

  function wireButtons() {
    $('#btn-menu').addEventListener('click', () => {
      CC.Game.save();
      CC.Menu.refresh();
      CC.Screens.show('menu');
    });

    $('#btn-undo').addEventListener('click', () => CC.Game.undo());
    $('#btn-flip').addEventListener('click', () => CC.Game.flip());

    $('#btn-resign').addEventListener('click', () => {
      if (CC.Game.state.over) return;
      if (confirm('Anh chắc muốn xin thua ván này ạ?')) CC.Game.resign();
    });

    /* --- tuy chon --- (moi o mot dong: doc trang thai luu, ghi lai khi doi)
     *
     * `sound` va `bgm` con co nut rieng tren thanh tren (ui-audio-toggle.js).
     * Hai noi dieu khien cung mot thu, nen ca hai deu doc/ghi CC.Store.prefs() va
     * deu nghe `prefs:changed` de ve lai. Khong ben nao giu trang thai rieng —
     * neu giu thi bam nut o thanh tren xong mo bang tuy chon se thay o danh dau sai.
     */
    const OPTS = [
      ['#opt-chat', 'chatOn'],
      ['#opt-sound', 'sound'],
      ['#opt-bgm', 'bgm'],
      ['#opt-fx', 'fx'],
      ['#opt-autoflip', 'autoFlip']
    ];

    OPTS.forEach(([sel, key]) => {
      const el = $(sel);
      if (!el) return;
      el.checked = !!CC.Store.prefs()[key];
      el.addEventListener('change', () => {
        CC.Store.setPref(key, el.checked);
        // Bat nhac/tieng lan dau can mo khoa AudioContext — phai co tuong tac nguoi dung,
        // va cai click vao o danh dau nay chinh la tuong tac do
        if (el.checked && (key === 'sound' || key === 'bgm')) CC.Audio.unlock();
      });
    });

    // Doi o cho khac (nut tren thanh tren) thi o danh dau phai theo
    CC.util.bus.on('prefs:changed', ({ key }) => {
      const row = OPTS.find(o => o[1] === key);
      if (!row) return;
      const el = $(row[0]);
      if (el) el.checked = !!CC.Store.prefs()[key];
    });

    /* Bang tuy chon gio NOI len tren noi dung (khong day layout xuong nua — xem
     * .settings-panel trong style.css). Da noi thi phai dong duoc bang cach bam ra
     * ngoai: no che mat ban co ma khong co cach thoat nao khac ngoai bam lai banh rang. */
    $('#btn-settings').addEventListener('click', e => {
      const p = $('#settings-panel');
      p.hidden = !p.hidden;
      e.stopPropagation();          // khong de cham nay roi thang xuong handler duoi
    });

    document.addEventListener('click', e => {
      const p = $('#settings-panel');
      if (p.hidden) return;
      if (p.contains(e.target)) return;      // bam trong bang thi giu nguyen
      p.hidden = true;
    });

    // Esc cung dong — nguoi dung ban phim khong phai di chuot ra ngoai de bam
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      const p = $('#settings-panel');
      if (!p.hidden) p.hidden = true;
    });

    $('#btn-rank-back').addEventListener('click', () => {
      CC.Menu.refresh();
      CC.Screens.show('menu');
    });
  }

  /* Thong bao ngan — dung cho loi dang nhap, dong bo */
  function showToast(text) {
    const t = CC.util.el('div', { class: 'toast', text });
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 300);
    }, 3000);
  }

  function wireFlow() {
    const B = CC.util.bus;

    B.on('ui:start', ({ mode, elo }) => {
      CC.Screens.show('game');
      CC.Game.start({
        mode,
        elo: elo || CC.Store.prefs().elo,
        playerColor: mode === 'ai' ? (CC.Store.prefs().playerColor || 'w') : 'w'
      });
      // Che do 2 nguoi khong can engine
      document.body.classList.toggle('mode-hotseat', mode === 'hotseat');
    });

    B.on('ui:resume', () => {
      CC.Screens.show('game');
      if (!CC.Game.restore()) {
        // Van luu bi hong — quay ve menu thay vi hien ban co trong
        CC.Store.clearGame();
        CC.Menu.refresh();
        CC.Screens.show('menu');
        return;
      }
      document.body.classList.toggle('mode-hotseat', CC.Game.state.mode === 'hotseat');
    });

    B.on('ui:new-game', () => {
      const st = CC.Game.state;
      CC.Game.start({ mode: st.mode, elo: st.elo, playerColor: st.playerColor });
    });

    /* Engine hong giua van — noi that thay vi de treo luot */
    B.on('game:engine-failed', () => {
      CC.ChatPicker.sayRaw(CC.cfg.CAT_NAME + ' bị lú rồi… Anh bấm "Thử lại" giùm em với ạ!');
    });

    /* Cap nhat thanh tich o menu sau moi van */
    B.on('game:over', () => CC.Menu.refresh());

    B.on('ui:toast', ({ text }) => showToast(text));

    B.on('ui:rank', () => {
      CC.RankPanel.refresh();
      CC.Screens.show('rank');
    });

    B.on('cloud:pulled', () => {
      showToast('Đã đồng bộ thành tích từ tài khoản');
      CC.Menu.refresh();
    });

    /* Roi man choi thi luu ngay — nguoi choi hay dong tab dot ngot */
    window.addEventListener('pagehide', () => CC.Game.save());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) CC.Game.save();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

;